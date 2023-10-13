import React from "react";
import { styled } from "styled-components";

import PanelBlockItem from "./PanelBlockItem.jsx";

const Blocks = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: row;
    width: 100%;
    justify-content: start;
    overflow: hidden;
`;

const BlockItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 150px;
    max-height: 150px;
    padding: 10px 0;
`;

const __blocks = [
    {
        name: "block-1",
        componentProps: {
            component: "block",
            width: "50px",
		    height: "50px",
		    background: "green",
        },
    },
    {
        name: "block-2",
        componentProps: {
            component: "block",
            width: "100px",
		    height: "100px",
		    background: "yellow",
        },
    },
    {
        name: "block-3",
        componentProps: {
            component: "block",
            width: "250px",
		    height: "250px",
		    background: "red",
        },
    },
];

const EditorPanelBlocks = () => {
    return (
	<Blocks>
		{__blocks.map((blockProps, i) => (
			<BlockItem key={`block-${i}`}>
				<PanelBlockItem
					{...blockProps}
				/>
			</BlockItem>
            ))}
	</Blocks>
    );
};

export default EditorPanelBlocks;