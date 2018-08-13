const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");
const webpack = require("webpack");


module.exports = (env, argv) => {
	const prod = argv.mode === "production";

	return {
		entry: {
			app: "./src/index.js"
		},
		output: {
			path: __dirname + "/dist",
			publicPath: "/",
			filename: "[name].js?[hash]",
			chunkFilename: "[name].js?[hash]"
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: "vue-loader"
				},
				{
					test: /\.js$/,
					loader: "babel-loader",
					exclude: file => (
						/node_modules/.test(file) &&
						!/\.vue\.js/.test(file)
					)
				},
				{
					test: /\.css$/,
					use: [
						prod ? MiniCssExtractPlugin.loader : "style-loader",
						"css-loader",
						{
							loader: "postcss-loader",
							options: {
								sourceMap: true
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						prod ? MiniCssExtractPlugin.loader : "vue-style-loader",
						"css-loader",
						"postcss-loader",
						{
							loader: "sass-loader",
							options: {
								data: "@import '~style/var.scss';"
							}
						}
					]
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
					test: /\.(woff|woff2|eot|ttf)$/,
					loader: "file-loader",
					options: {
						name: "[name].[ext]"
					}
				},
				{
					test: /\.md$/,
					use: [
						{
							loader: "html-loader"
						},
						{
							loader: "markdown-loader",
							options: {}
						}
					]
				}
			]
		},
		optimization: {
			namedModules: true,
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendor",
						chunks: "all"
					}
				}
			}
		},
		devServer: {
			historyApiFallback: true,
			disableHostCheck: true,
			host: "0.0.0.0",
			port: 3001
		},
		resolve: {
			alias: {
				"vue$": "vue/dist/vue.runtime.esm.js",
				"style": __dirname + "/src/style",
				"@": __dirname + "/src"
			}
		},
		performance: {
			hints: false
		},
		plugins: [
			new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, "element-ui/lib/locale/lang/en"),
			new VueLoaderPlugin(),

			new MiniCssExtractPlugin({
				filename: "[name].css"
			}),

			new OptimizeCssAssetsPlugin({
				cssProcessorOptions: {
					keyframes: true,
					discardComments: {safe: true, removeAll: true}
				},
				canPrint: true
			}),

			new HtmlWebpackPlugin({
				template: "src/index.html",
				hash: prod
			}),

			new webpack.DefinePlugin({
				"process.env": {
					API: JSON.stringify(process.env.API)
				}
			}),

			new BrowserSyncPlugin({
				open: false,
				port: 3000,
				ui: false,
				proxy: "http://localhost:3001"
			}, {reload: false, ws: true}),

			new BundleAnalyzerPlugin({
				analyzerMode: prod ? "static" : "server",
				reportFilename: "report/index.html",
				openAnalyzer: false,
				analyzerHost: "0.0.0.0",
				analyzerPort: 3002,
				excludeAssets: name => name.includes("hot-update.js")
			}),
		],

		devtool: prod ? "source-map" : "eval-source-map"
	};
};
