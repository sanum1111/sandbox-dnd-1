import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { previewElementName } from "config/editor";

export const definePreviewChildIndex = ({ x, y }, ...ids) => {
	const acc = [x];
	let i = ids.length;

	while (i--) {
		if (ids[i] === previewElementName) {
			continue;
		}

		const ref = document.getElementById(ids[i]);

		if (!ref) {
			continue;
		}

		const rect = ref.getBoundingClientRect();

		acc.push(rect.left); // start
		acc.push(rect.left + (ref.offsetWidth / 2)); // middle
		acc.push(rect.left + ref.offsetWidth); // end
	}

	const currentIndex = acc.sort((a, b) => a - b).indexOf(x);

	// why devide by 3? coz, each child represented with 3 params: start, middle, end
	return Math.ceil(currentIndex / 3) - 1;
};

export const useMouseMoveEvent = (props) => {
	const {
		onMove = () => null,
		applyEffects = false,
		effects = [],
		delayedEffects = [],
		delay = 100,
	} = props;

	const _delay = useRef(null);

	return (event) => {
		let acc = {
			clientX: event.clientX,
			clientY: event.clientY,
		};

		onMove(acc);

		if (!applyEffects) {
            return;
        }

		let i = 0;

		while (i < effects.length) {
			acc = effects[i](acc, event) || acc;
			i++;
		}

		if (delay.current !== null) {
			clearTimeout(delay.current);
		}

		_delay.current = setTimeout(() => {
			let i = 0;

			while (i < delayedEffects.length) {
				acc = delayedEffects[i](acc, event) || acc;
				i++;
			}
		}, delay);
	};
};