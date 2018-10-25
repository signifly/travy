const webpack = require("webpack");

module.exports = {
	css: {
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
					"API": JSON.stringify(process.env.API)
				}
			})
		]
	},
	chainWebpack: config => {
		const svgRule = config.module.rule("svg");
		svgRule.uses.clear();
		svgRule.use("svg-inline-loader").loader("svg-inline-loader").options({
			removeTags: true,
			removingTags: ["title", "desc"],
			idPrefix: true,
			classPrefix: true,
			removeSVGTagAttrs: false
		});

		config.module.rule("markdown")
			.test(/\.md$/)
			.use("html-loader")
			.loader("html-loader")
			.end()
			.use("markdown-loader")
			.loader("markdown-loader")
			.end();
	}
};
