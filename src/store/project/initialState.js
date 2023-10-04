export default {
	__root: {
		fullWidth: true,
		fullHeigth: true,
		component: "__root",
		children: [
			"element-1",
			"element-2",
		],
	},
	["element-1"]: {
		component: "block",
		height: "200px",
		width: "100px",
		margin: "20px",

		// onClick: (e) => {
		// 	console.log(e.currentTarget.style);
		// 	e.currentTarget.style.width = (parseInt(e.currentTarget.style.width || 0) + 100) + "px";
		// },
	},
	["element-2"]: {
		component: "block",
		height: "200px",
		margin: "20px",
		children: [
			"element-3",
			"element-4",
		],
	},
	["element-3"]: {
		component: "block",
		height: "20px",
		width: "20px",
		margin: "20px",
	},
	["element-4"]: {
		component: "block",
		height: "20px",
		width: "20px",
		margin: "20px",
	},
};