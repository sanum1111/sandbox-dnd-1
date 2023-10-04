import React from "react";
import PropTypes from "prop-types";

import * as Components from "components";

const Renderer = ({ id, component, children, project, ...props }) => {
	const Element = Components[component || id];

	return (
		<Element
			{...props}
			id={id}
		>
			{children?.map((id) => (
				<Renderer
					key={id}
					id={id}
					project={project}
					{...project[id]}
				/>
			))}
		</Element>
	);
};

Renderer.propTypes = {
    id: PropTypes.string.isRequired,
    project: PropTypes.object.isRequired,
    component: PropTypes.string,
    children: PropTypes.array,
};

export default Renderer;