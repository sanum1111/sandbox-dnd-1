import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import * as config from "config";
import project from "store/project";

import Field from "components/Root/Field";

import Renderer from "./Renderer";

const getRefIndex = (event, ...ids) => {
	const acc = [event.clientX];
	let i = ids.length;

	while (i--) {
		if (ids[i] === "__preview") {
			continue;
		}

		const ref = document.getElementById(ids[i]);

		if (!ref) {
			continue;
		}

		const rect = ref.getBoundingClientRect();

		acc.push(rect.left); // start
		acc.push(rect.left + (ref.offsetWidth / 2)); // middle
		acc.push(rect.left + ref.offsetWidth); // end
	}

	const currentIndex = acc.sort((a, b) => a - b).indexOf(event.clientX);

	return Math.ceil(currentIndex / 3) - 1;
};

const FieldBase = (props) => {
	const { size } = props;

	const delay = useRef(null);
	const prevId = useRef(null);
	const currentId = useRef(null);
	const projectState = useSelector((state) => state.project);
	const dispatch = useDispatch();

	const handleMove = (e) => {
		const id = e.target.id;

		if (!id || !projectState[id]?.children) {
			return;
		}

		if (delay.current !== null) {
			clearTimeout(delay.current);
		}

		if (!prevId.current) {
			prevId.current = id;
		}

		if (!currentId.current) {
			currentId.current = id;
		}

		if (currentId.current !== id) {
			prevId.current = currentId.current;
			currentId.current = id;
		}

		delay.current = setTimeout(() => {
			const index = getRefIndex(e, id, ...projectState[id].children);

			dispatch(project.actions.appendPreview({
				id,
				index,
				prevId: prevId.current,
			}));
		}, 100);
	};

	return (
		<Field
			w={config.screen[size][0]}
			onMouseMove={handleMove}
		>
			<Renderer
				id="__root"
				{...projectState.__root}
				project={projectState}
			/>
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