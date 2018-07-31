const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");


const app = (env, argv) => {
	const prod = argv.mode === "production";

	return {
		entry: {
			app: "./src/index.js"
		},
		output: {
			path: __dirname + "/dist",
			publicPath: "/",
			filename: "[name].js?[hash]"
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
			new webpack.NamedModulesPlugin(),
			new VueLoaderPlugin(),

			new MiniCssExtractPlugin({
				filename: "[name]-[hash].css"
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
					GMAPS_KEY: JSON.stringify(process.env.GMAPS_KEY),
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


//
//
//
//
//
//
// // RETAILERS CONFIG
//
// const retailers = {
// 	entry: {
// 		"retailers": ["babel-polyfill", "./src/components/ext/retailers/index.js"]
// 	},
// 	output: {
// 		path: __dirname + "/dist/ext",
// 		publicPath: "/ext/",
// 		filename: "[name].js?[hash]"
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.vue$/,
// 				loader: "vue-loader",
// 				options: {
// 					loaders: {
// 						scss: ExtractTextPlugin.extract({
// 							use: ["css-loader", "sass-loader?data=@import '~style/var';"],
// 							fallback: "vue-style-loader"
// 						})
// 					}
// 				}
// 			},
// 			{
// 				test: /\.js$/,
// 				loader: "babel-loader",
// 				exclude: /node_modules/
// 			},
// 			{
// 				test: /\.svg$/,
// 				loader: "svg-inline-loader",
// 				options: {
// 					removeTags: true,
// 					removingTags: ["title", "desc"],
// 					classPrefix: true,
// 					idPrefix: true,
// 					removeSVGTagAttrs: false
// 				}
// 			},
// 			{
// 				test: /\.(png|jpg|gif|eps|pdf)$/,
// 				oneOf: [
// 					{
// 						resourceQuery: /name/,
// 						loader: "file-loader",
// 						options: {
// 							name: "[name].[ext]"
// 						}
// 					},
// 					{
// 						loader: "file-loader"
// 					}
// 				]
// 			},
// 			{
// 				test: /\.(css|scss|sass)$/,
// 				use: ExtractTextPlugin.extract({
// 					use: ["css-loader", "sass-loader", "postcss-loader"],
// 					fallback: "style-loader"
// 				})
// 			},
// 			{
// 				test: /\.(woff|woff2|eot|ttf)$/,
// 				loader: "file-loader",
// 				options: {
// 					name: "[name].[ext]"
// 				}
// 			}
// 		]
// 	},
// 	resolve: {
// 		alias: {
// 			"vue$": "vue/dist/vue.runtime.esm.js",
// 			"style": __dirname + "/src/style",
// 			"@": __dirname + "/src"
// 		}
// 	},
// 	performance: {
// 		hints: false
// 	},
// 	plugins: [
// 		new webpack.HotModuleReplacementPlugin(),
// 		new webpack.NamedModulesPlugin(),
//
// 		new HtmlWebpackPlugin({
// 			template: "src/components/ext/retailers/index.html",
// 			filename: "retailers/index.html",
// 			hash: production,
// 			inject: false
// 		}),
//
// 		new ExtractTextPlugin({filename: "[name].css", disable: true, allChunks: true}),
//
// 		new webpack.DefinePlugin({
// 			"process.env": {
// 				NODE_ENV: production ? "'production'" : "'development'",
// 				GMAPS_KEY: JSON.stringify(process.env.GMAPS_KEY),
// 				API: JSON.stringify(process.env.API)
// 			}
// 		})
// 	],
//
// 	devtool: production ? "#source-map" : "#eval-source-map"
// };
//
//
// if (production) {
// 	retailers.plugins = retailers.plugins.concat([
// 		new BundleAnalyzerPlugin({
// 			analyzerMode: "static",
// 			reportFilename: "retailers/report/index.html"
// 		}),
//
// 		new UglifyJsPlugin({
// 			parallel: true,
// 			sourceMap: true
// 		}),
//
// 		new OptimizeCssAssetsPlugin({
// 			cssProcessorOptions: {
// 				keyframes: true,
// 				discardComments: {removeAll: true}
// 			},
// 			canPrint: true
// 		})
// 	]);
// }


// module.exports = [app, retailers];
module.exports = app;
