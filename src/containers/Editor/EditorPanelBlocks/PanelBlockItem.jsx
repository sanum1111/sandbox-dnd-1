import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";

import * as Components from "components";

import { previewElementName } from "config/editor";
import project from "store/project";
import editor from "store/editor";

const BlockWrap = styled.div`
    transition:
        box-shadow .1s ease-out,
        transform .1s ease-out;

    &:hover {
        box-shadow: 0 0 10px lightblue;
    }

    transform: ${({ scale = 0.01 }) => `scale(${scale})`};
`;

const PanelBlockItem = (props) => {
    const {
        componentProps,
        name,
        maxHeight,
    } = props;

    const {
        component, ...restComponentProps
    } = componentProps;

    const Component = Components[component];

    const itemRef = useRef(null);
    const [itemParams, setItemParams] = useState({});

    const dispatch = useDispatch();

    const scale = useMemo(() => {
        if (!itemParams.height || !maxHeight) {
            return 0.1;
        }

        const _scale = maxHeight / itemParams.height;

        if (_scale > 1) {
            return 1;
        }

        return _scale;
    }, [maxHeight, itemParams]);

    useEffect(() => {
        setItemParams({
            height: itemRef.current.offsetHeight,
            width: itemRef.current.offsetWidth,
        });
    }, []);

    const handleClick = () => {
        dispatch(editor.actions.setPreviewParams({
            name,
            size: itemParams,
            componentProps,
        }));

        dispatch(editor.actions.setEditorPanelShow(false));
    };

    return (
	<BlockWrap
		ref={itemRef}
		id={`PanelBlockItem-${name}`}
		onClick={handleClick}
		scale={scale}
	>
		<Component {...restComponentProps} />
	</BlockWrap>
    );
};

PanelBlockItem.defaultProps = {
    maxHeight: 150,
};

PanelBlockItem.propTypes = {
    component: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    maxHeight: PropTypes.number.isRequired,
};

export default PanelBlockItem;