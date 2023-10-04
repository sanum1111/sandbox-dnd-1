import { styled, css } from "styled-components";

const Block = styled.div`
	display: flex;
	flex-direction: row;
	min-height: 100px;
	min-width: 100px;
	border: 1px solid;
	padding: 10px;
	margin: 10px;
	justify-content: end;
	z-index: 2;
	position: relative;

	transition: width 0.2s ease-in-out;


	${({ fullWidth }) => fullWidth && css`
		width: 100%;
	`}
	${({ fullHeigth }) => fullHeigth && css`
		height: 100%;
		min-height: 100%;
	`}
	height: ${({ height = "auto" }) => height};
	margin: ${({ margin = "0" }) => margin};
	padding: ${({ padding = "0" }) => padding};
`;

export default Block;