import React from "react";

import Editor from "./Editor.jsx";
import EditorPanel from "./EditorPanel";
import EditorPanelHead from "./EditorPanelHead";
import EditorPanelBlocks from "./EditorPanelBlocks";

export default (props) => {
	return (
		<React.Fragment>
			<Editor {...props} />
			<EditorPanel>
				<EditorPanelHead />
				<EditorPanelBlocks />
			</EditorPanel>
		</React.Fragment>
	);
};