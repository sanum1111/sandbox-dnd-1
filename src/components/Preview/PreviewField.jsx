import React, { useRef } from "react";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import * as config from "config";
import { previewElementName, previewTargetName } from "config/editor";
import editor from "store/editor";
import project from "store/project";

import * as FieldUtils from "./utils/FieldUtils";

const Field = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    flex-direction: row;
    align-content: baseline;
    box-shadow: 0 0 8px black;

    max-width: ${({ width = 10 }) => `${width}px`};
    min-width: ${({ width = 10 }) => `${width}px`};
    opacity: ${({ opacity }) => opacity || 1};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 30px;
    overflow: auto;
    z-index: 1;
`;

const PreviewElement = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
	background: none;
    box-shadow: 0 0 10px blue;
    opacity: 0;
    height: ${({ height }) => `${height - 4}px`};
    width: ${({ width }) => `${width - 4}px`};
    z-index: 999;
    border: 2px dashed blue;
    border-radius: 10px;
`;

const Svg = styled.svg`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

const PreviewField = ({ children }) => {
    const {
        previewParams,
        fieldSize,
    } = useSelector((state) => state.editor);

    const elementRef = useRef(null);

    // const lineRef = useRef(null);
    const projectState = useSelector((state) => state.project);
	const dispatch = useDispatch();

    const isPreviewElement = !!previewParams.name;

	const handleMouseMove = FieldUtils.useMouseMoveEvent({
        applyEffects: isPreviewElement,
        delay: 100,
        effects: [
            (acc) => {
                const sizeX = previewParams.size.width / 2;
                const sizeY = previewParams.size.height / 2;

                // preview corner position
                acc.previewX = acc.clientX - sizeX;
                acc.previewY = acc.clientY - sizeY;

                if (elementRef.current) {
                    elementRef.current.style.opacity = 1;
                    elementRef.current.style.left = `${acc.previewX}px`;
                    elementRef.current.style.top = `${acc.previewY}px`;
                }

                if (previewParams.position && !previewParams.isTargetRenderIn && !previewParams.isTargetRenderOut) {
                    const matchX = Math.abs(previewParams.position[0] - acc.previewX) < 10;
                    const matchY = Math.abs(previewParams.position[1] - acc.previewY) < 10;

                    dispatch(editor.actions.setPreviewParams({
                        isTargetRenderIn: (matchX || matchY) && [previewParams.id, previewParams.index],
                    }));
                }

                const focused = document.elementFromPoint(acc.previewX, acc.previewY);
                const fixFocus = [previewElementName, previewTargetName].indexOf(focused?.id) < 0;

                if (fixFocus) {
                    acc.focusedId = focused?.id;
                }

                return acc;
            },
        ],
        delayedEffects: [
            (acc) => {
                if (!acc.focusedId || !projectState[acc.focusedId]?.children) {
                    return ;
                }

                const index = FieldUtils.definePreviewChildIndex(
                    {
                        x: acc.previewX,
                        y: acc.previewY,
                    },
                    acc.focusedId,
                    ...projectState[acc.focusedId].children,
                );

                const changedTarget = previewParams.id
                                    && previewParams.index
                                    && (previewParams.id !== acc.focusedId || previewParams.index !== index);

                // console.log(acc.focusedId, index);

                dispatch(editor.actions.setPreviewParams({
                    isTargetRenderIn: [acc.focusedId, index],
                    isTargetRenderOut: changedTarget,
                    id: acc.focusedId,
                    index,
                }));
            },
        ],
	});

    const handlePreviewClick = () => {
        const child = String(Date.now());

        dispatch(project.actions.createElement({
            id: child,
            ...previewParams.componentProps,
        }));

        dispatch(project.actions.appendChild({
            child,
            ...previewParams,
        }));

        dispatch(editor.actions.cleanupPreviewParams());
    };

    return (
	<Field
		width={config.screen[fieldSize][0]}
		onMouseMove={handleMouseMove}
	>
		{children}
		{isPreviewElement && (
			<PreviewElement
				id={previewElementName}
				ref={elementRef}
				width={previewParams.size.width}
				height={previewParams.size.height}
				onClick={handlePreviewClick}
			/>
        )}

		{/* {isPreviewElement && !!previewParams.position && (
			<Svg>
				<line
					ref={lineRef}
					x1={previewParams.position[0]}
					y1={previewParams.position[1]}
					stroke="green"
				/>
			</Svg>
        )} */}
	</Field>
    );
};

export default PreviewField;