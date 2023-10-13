import React, { useEffect, useMemo, useRef } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { previewElementName, previewTargetName } from "config/editor";
import editor from "store/editor";

const Target = styled.div`
    position: relative;
    opacity: 1;
    background: none;
    height: ${({ height }) => `${height}px`};
    width: ${({ width }) => `${width}px`};
    transition: 
        width .3s ease-out,
        height .3s ease-out;
`;

const PreviewTarget = () => {
    const targetRef = useRef(null);
    const selectorRef = useRef(null);
    const delayRef = useRef(null);
    const dispatch = useDispatch();

    const { isTargetRenderIn, isTargetRenderOut, size, index, id } = useSelector((state) => state.editor.previewParams);

    useEffect(() => {
        const rect = targetRef.current.getBoundingClientRect();

        dispatch(editor.actions.setPreviewParams({
            position: [
                rect.left,
                rect.top,
            ],
        }));
    }, []);

    const expand = useMemo(() => {
        if (!selectorRef.current) {
            selectorRef.current = [id, index];
        }

        const expand = Array.isArray(isTargetRenderIn) && isTargetRenderIn.join("_") === selectorRef.current.join("_");

        if (!expand) {
            if (delayRef.current !== null) {
                clearTimeout(delayRef);
            }

            delayRef.current = setTimeout(() => {
                dispatch(editor.actions.setPreviewParams({
                    isTargetRenderOut: false,
                }));
            }, 300);
        }

        return expand;
    }, [index, id]);

    return (
	<Target
		id={previewTargetName}
		ref={targetRef}
		width={expand ? size.width : 0}
		height={expand ? size.height : 0}
	/>
    );
};

export default PreviewTarget;