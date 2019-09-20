const webpack = require("webpack");

module.exports = {
	parallel: false,

	devServer: {
		disableHostCheck: true,
		public: "dev.signifly.io"
	},

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

		// load markdown
		config.module
			.rule("markdown")
			.test(/\.md$/)
			.use("html-loader")
			.loader("html-loader")
			.end()
			.use("markdown-loader")
			.loader("markdown-loader")
			.end();

		// new progress plugin
		config.plugins.delete("progress");
		config
			.plugin("simple-progress-webpack-plugin")
			.use(require.resolve("simple-progress-webpack-plugin"), [
				{format: "minimal"}
			]);
	}
};
