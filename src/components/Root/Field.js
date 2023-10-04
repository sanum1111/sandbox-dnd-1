import { styled } from "styled-components";

const Field = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    flex-direction: row;
    align-content: baseline;
    box-shadow: 0 0 8px black;

    max-width: ${({ w = 10 }) => `${w}px`};
    min-width: ${({ w = 10 }) => `${w}px`};
`;

export default Field;