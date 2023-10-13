import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import PreviewField from "components/Preview/PreviewField.jsx";
import * as PreviewTargetUtils from "components/Preview/utils/TargetUtils";

const Editor = (props) => {
	const {
		renderer: Renderer,
	} = props;

	const projectState = useSelector((state) => state.project);

	return (
		<PreviewField>
			<Renderer
				id="__root"
				{...projectState.__root}
				project={projectState}
				useChildrenUpdater={PreviewTargetUtils.useChildrenUpdater}
			/>
		</PreviewField>
	);
};

Editor.defaultProps = {
	renderer: () => null,
};

Editor.propTypes = {
	renderer: PropTypes.func.isRequired,
};

export default Editor;