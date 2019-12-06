const webpack = require("webpack");

const script = process.env.npm_lifecycle_event;

module.exports = {
	css: {
		extract: script === "build-app",
		loaderOptions: {
			sass: {
				data: `@import "@/style/var.scss";`
			}
		}
	},

	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				"process.env": {
					API: JSON.stringify(process.env.API)
				}
			})
		]
	},

	chainWebpack: (config) => {
		// inline svg
		const svgRule = config.module.rule("svg");
		svgRule.uses.clear();
		svgRule
			.use("svg-inline-loader")
			.loader("svg-inline-loader")
			.options({
				removeTags: true,
				removingTags: ["title", "desc"],
				idPrefix: true,
				classPrefix: true,
				removeSVGTagAttrs: false
			});
	}
};
