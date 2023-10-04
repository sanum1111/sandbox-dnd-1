const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const __src = path.resolve(__dirname, "src");

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "bundle.js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html",
		}),
	],
	mode: "development",
	devServer: {
		port: 3030, // you can change the port
	},

	resolve: {
		alias: {
			"src": path.resolve(__src),
			"config": path.resolve(__src, "config"),
			"components": path.resolve(__src, "components"),
			"containers": path.resolve(__src, "containers"),
			"store": path.resolve(__src, "store"),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: ["babel-plugin-styled-components"],
					},
				},
			},
		],
	},
};