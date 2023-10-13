import { styled } from "styled-components";

import * as attributes from "config/attributes";

const defaultAttr = Object.keys(attributes).reduce((acc, key) => {
	if (attributes[key].defaultValue) {
		acc[attributes[key].name] = attributes[key].defaultValue;
	}

	return acc;
}, {});

const Block = styled.div((props) => {
	const acc = { ...defaultAttr };

	for (const key in props) {
		if (props.hasOwnProperty(key) && attributes[key]) {
			acc[attributes[key].name] = props[key];
		}
	}

	return acc;
});

export default Block;