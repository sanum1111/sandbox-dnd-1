import React from "react";
import PropTypes from "prop-types";
import { styled, css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import editor from "store/editor";

const Panel = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 0;
    bottom: 0;
    width: 100%;
    box-shadow: 0 0 8px black;
    z-index: 99;
    background: white;
    transition: 
        height .15s ease-out,
        bottom .15s ease-out;

    ${({ open }) => css`
        height: ${open ? 200 : 30}px;
        bottom: ${open ? 5 : 0}px;
    `}
`;

const EditorPanel = ({ children }) => {
    const dispatch = useDispatch();
    const editorState = useSelector((state) => state.editor);

    const handleHover = () => {
        dispatch(editor.actions.setEditorPanelShow(true));
    };

    const handleBlur = () => {
        dispatch(editor.actions.setEditorPanelShow(false));
    };

    return (
	<Panel
		onMouseEnter={handleHover}
		onMouseLeave={handleBlur}
		open={editorState.editorPanelShow}
	>
		{children}
	</Panel>
    );
};

EditorPanel.propTypes = {
    children: PropTypes.any.isRequired,
};

export default EditorPanel;