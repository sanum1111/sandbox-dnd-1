import { useRef } from "react";

import { previewElementName } from "config/editor";

export const definePreviewSortIndex = (event, ...ids) => {
	const acc = [event.clientX];
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

	const currentIndex = acc.sort((a, b) => a - b).indexOf(event.clientX);

	return Math.ceil(currentIndex / 3) - 1;
};

export const useMouseMoveEvent = ({ project, action, delay = 100 }) => {
	const _delay = useRef(null);
	const prevId = useRef(null);
	const currentId = useRef(null);

	return (e) => {
		console.log(project[previewElementName]);

		if (!project[previewElementName]) {
			return;
		}

		const id = e.target.id;

		if (!id || !project[id]?.children) {
			return;
		}

		if (delay.current !== null) {
			clearTimeout(delay.current);
		}

		if (!prevId.current) {
			prevId.current = id;
		}

		if (!currentId.current) {
			currentId.current = id;
		}

		if (currentId.current !== id) {
			prevId.current = currentId.current;
			currentId.current = id;
		}

		_delay.current = setTimeout(() => {
			const index = definePreviewSortIndex(e, id, ...project[id].children);

			action({
				id,
				index,
				prevId: prevId.current,
			});
		}, delay);
	};
};