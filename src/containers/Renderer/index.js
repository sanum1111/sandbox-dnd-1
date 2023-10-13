import React from "react";
import PropTypes from "prop-types";

import * as Components from "components";

const Renderer = (props) => {
	const {
		id,
		component,
		children,
		project,
		useChildrenUpdater,
		...elementProps
	} = props;

	const Element = Components[component || id];

	const childrenUpdated = useChildrenUpdater(children, id);

	if (!Element) {
		console.warn(`[Renderer] Element with id "${component || id}" is not defined.`);
		return null;
	}

	return (
		<Element
			{...elementProps}
			id={id}
		>
			{childrenUpdated?.map((id) => (
				<Renderer
					key={id}
					id={id}
					project={project}
					useChildrenUpdater={useChildrenUpdater}
					{...project[id]}
				/>
			))}
		</Element>
	);
};

Renderer.defaultProps = {
	useChildrenUpdater: (e) => e,
};

Renderer.propTypes = {
    id: PropTypes.string.isRequired,
    project: PropTypes.object.isRequired,
    useChildrenUpdater: PropTypes.func.isRequired,
    component: PropTypes.string,
    children: PropTypes.array,
};

export default Renderer;