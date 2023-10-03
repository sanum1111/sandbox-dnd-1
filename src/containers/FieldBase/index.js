import React, { useRef, useEffect, useState } from "react";
import { styled, css } from "styled-components";
import PropTypes from "prop-types";

import * as config from "config";

const BlockBase = styled.div`
    min-width: ${({ w = 10 }) => w + "px"};
    height: ${({ h = 10 }) => h + "px"};
    z-index: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    color: lightgray;
`;

const BlockHover = styled(BlockBase)`
    position: absolute;
    background: yellow;
`;

const Field = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    flex-direction: row;
    align-content: baseline;
    box-shadow: 0 0 8px black;

    max-width: ${({ w = 10 }) => w + "px"};
    min-width: ${({ w = 10 }) => w + "px"};
`;

const Root = styled.div`
	display: flex;
	flex-direction: row;
	min-height: 100%;
	min-width: 100%;
	z-index: 1;
`;

const editable = css`
	&:after {
		content: " ";
		position: absolute;
		width: 100%;
		height: 100%;
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect x='0' y='0' width='10' height='10' style='fill: none;stroke:black;stroke-width:2;stroke-opacity:0.2' /%3E%3C/svg%3E");
		background-repeat: repeat;
		top: 0;
		left: 0;
	}
`;

const Div = styled.div`
	display: flex;
	flex-direction: row;
	min-height: 100px;
	min-width: 100px;
	border: 1px solid;
	padding: 10px;
	margin: 10px;
	justify-content: end;
	z-index: 2;
	position: relative;

	transition: width 0.2s ease-in-out;


	${({ fullWidth }) => fullWidth && css`
		width: 100%;
	`}
	${({ fullHeigth }) => fullHeigth && css`
		height: 100%;
		min-height: 100%;
	`}
	height: ${({ height = "auto" }) => height};
	margin: ${({ margin = "0" }) => margin};
	padding: ${({ padding = "0" }) => padding};

	${({ hover }) => hover && editable}
`;

const handleBlockPositionBySize = ({ fieldRef, hoverBlock, size = 10 }) => (e) => {
	if (!fieldRef?.current || !hoverBlock?.current) {
		return;
	}

	const x = parseInt((e.clientX - fieldRef.current.offsetLeft) / size);
	const y = parseInt((e.clientY - fieldRef.current.offsetTop) / size);

	console.log(x, y);

	if (hoverBlock.current) {
		hoverBlock.current.style.left = `${x * size}px`;
		hoverBlock.current.style.top = `${y * size}px`;
	} else {
		// console.log(id, x, y);
	}
};

let prevId = "";

const FieldBase = (props) => {
	const [project, updateProject] = useState(Project);
	const { size } = props;

	const handleMove = (e) => {
		const id = e.target.id;

		if (!id || !project[id].children) {
			return;
		}

		const currentIndex = project[id].children.indexOf("__preview");

		// remove prev
		if (prevId && prevId !== id && currentIndex >= 0) {
			project[prevId].children.slice(currentIndex, 1);
		}

		prevId = id;

		if (currentIndex == -1) {
			project[id].children.push("__preview");
		}

		// console.log(id, _project[id].children);
		updateProject(project);
	};

	console.log(project);

	return (
		<Field
			w={config.screen[size][0]}
			onMouseMove={handleMove}
		>
			<Renderer id="__root" {...project.__root} project={project} />
		</Field>
	);
};

FieldBase.defaultProps = {
	size: config.size.HD,
};

FieldBase.propTypes = {
	size: PropTypes.string.isRequired,
};

export default FieldBase;

const getRefsParams = (...args) => {
	const acc = {};
	let i = args.length;

	while (i--) {
		const ref = document.getElementById(args[i]);
		acc[args[i]] = {
			x: ref.offsetLeft,
			y: ref.offsetTop,
			w: ref.offsetWidth,
			h: ref.offsetHeight,
			eX: ref.offsetLeft + ref.offsetWidth,
			eY: ref.offsetTop + ref.offsetHeight,
		};
	}

	return acc;
};

const Renderer = ({ id, parentId, component, children, project, ...props }) => {
	const Element = Components[component];

	const handleWindowMouseMove = (e) => {
		if (!children) {
			return;
		}

		const placement = getRefsParams(id, ...children);

		console.log(placement);
	};

	console.log(children);

	return (
		<Element
			{...props}
			id={id}
		>
			{children && children.map((id, index) => (
				<Renderer
					key={id}
					id={id}
					parentId={id}
					project={project}
					{...project[id]}
				/>
			))}
		</Element>
	);
};

const Components = {
	["root"]: Root,
	["div"]: Div,
	["__preview"]: () => <span>preview</span>,
};

const Project = {
	__root: {
		fullWidth: true,
		fullHeigth: true,
		component: "root",
		children: [
			"element-1",
			"element-2",
		]
	},
	["element-1"]: {
		component: "div",
		height: "200px",
		width: "100px",
		margin: "20px",
		// onClick: (e) => {
		// 	console.log(e.currentTarget.style);
		// 	e.currentTarget.style.width = (parseInt(e.currentTarget.style.width || 0) + 100) + "px";
		// },
	},
	["element-2"]: {
		component: "div",
		height: "200px",
		margin: "20px",
		children: [
			"element-3",
			"element-4",
		]
	},
	["element-3"]: {
		component: "div",
		height: "20px",
		width: "20px",
		margin: "20px",
	},
	["element-4"]: {
		component: "div",
		height: "20px",
		width: "20px",
		margin: "20px",
	}
};