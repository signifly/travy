const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const production = process.env.NODE_ENV === "production";

module.exports = {
	entry: {
		vendor: ["babel-polyfill"],
		app: ["./app/index.js"]
	},
	output: {
		path: __dirname + "/dist",
		publicPath: "/",
		filename: "[name].chunk.js",
		chunkFilename: "[name].chunk.js"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loaders: {
						scss: ExtractTextPlugin.extract({
							use: ["css-loader", "sass-loader?data=@import '~style/var';"],
							fallback: "vue-style-loader"
						})
					},
				}
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-loader"
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.svg$/,
				loader: "svg-inline-loader",
				options: {
					removeTags: true,
					removingTags: ["title", "desc"],
					classPrefix: true,
					idPrefix: true,
					removeSVGTagAttrs: false
				}
			},
			{
				test: /\.(png|jpg|gif|eps|pdf)$/,
				oneOf: [
					{
						resourceQuery: /name/,
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					},
					{
						loader: "file-loader"
					}
				]
			},
			{
				test: /\.(css|scss|sass)$/,
				use: ExtractTextPlugin.extract({
					use: ["css-loader", "sass-loader", "postcss-loader"],
					fallback: "style-loader"
				})
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]"
				}
			}
		]
	},
	resolve: {
		alias: {
			"vue$": "vue/dist/vue.runtime.esm.js",
			"style": __dirname + "/app/style",
			"@": __dirname + "/app"
		}
	},
	devServer: {
		historyApiFallback: true,
		host: "0.0.0.0",
		port: 3001,
		hot: true
	},
	performance: {
		hints: false
	},
	plugins: [
		new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, "element-ui/lib/locale/lang/en"),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),

		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: ({resource}) => /node_modules/.test(resource)
		}),

		new HtmlWebpackPlugin({
			template: "app/index.hbs",
			hash: production,
			title: "Sikane"
		}),

		new ExtractTextPlugin({filename: "app.css", disable: !production}),

		new BrowserSyncPlugin({
			open: false,
			proxy: "http://localhost:3001",
		}, {reload: false, ws: true}),

		new BundleAnalyzerPlugin({
			analyzerMode: production ? "static" : "server",
			reportFilename: "report.html",
			analyzerPort: 3005,
			openAnalyzer: false
		})
	],

	devtool: production ? "" : "#eval-source-map"
}

if (production) {
	module.exports.plugins = module.exports.plugins.concat([
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: "'production'"
			}
		}),

		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: {discardComments: {removeAll: true}},
			canPrint: true
		}),

		new MinifyPlugin()
	]);
}
