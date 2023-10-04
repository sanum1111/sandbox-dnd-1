import { styled, keyframes } from "styled-components";

const previewAnimation = keyframes`
    0% { width: 0; opacity: 0; }
    100% { width: 50px; opacity: 0.3; }
`;

const Preview = styled.div`
	background: blue;
    border-radius: 20px;
    border: 2px solid lightblue;
    opacity: 0.3;
    height: 50px;
    width: 50px;
    max-width: 50px;

    animation-name: ${previewAnimation};
    animation-duration: 200ms;
`;

export default Preview;