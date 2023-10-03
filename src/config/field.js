import * as size from "./size";
import screen from "./screen";
import block from "./block";

export default {
	[size.F_HD]: [
		screen[size.F_HD][0] / block[size.F_HD][0],
		screen[size.F_HD][1] / block[size.F_HD][1],
	],
	[size.HD]: [
		screen[size.HD][0] / block[size.HD][0],
		screen[size.HD][1] / block[size.HD][1],
	]
};