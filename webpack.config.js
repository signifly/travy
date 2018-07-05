const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const production = process.env.NODE_ENV === "production";





// APP CONFIG

const app = {
	entry: {
		vendor: ["babel-polyfill"],
		app: ["./src/index.js"]
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
				loader: "vue-loader",
				options: {
					loaders: {
						scss: ExtractTextPlugin.extract({
							use: ["css-loader", "sass-loader?data=@import '~style/var';"],
							fallback: "vue-style-loader"
						})
					}
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
			"style": __dirname + "/src/style",
			"@": __dirname + "/src"
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

		new HtmlWebpackPlugin({
			template: "src/index.html",
			hash: production
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: ({resource}) => /node_modules/.test(resource)
		}),

		new ExtractTextPlugin({filename: "[name].css", disable: !production, allChunks: true}),

		new BrowserSyncPlugin({
			open: false,
			port: 3000,
			proxy: "http://localhost:3001",
			ui: false
		}, {
			reload: false, ws: true
		}),

		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: production ? "'production'" : "'development'",
				GMAPS_KEY: JSON.stringify(process.env.GMAPS_KEY),
				API: JSON.stringify(process.env.API)
			}
		})
	],

	devtool: production ? "#source-map" : "#eval-source-map"
};

if (production) {
	app.plugins = app.plugins.concat([
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "report/index.html"
		}),

		new UglifyJsPlugin({
			parallel: true,
			sourceMap: true
		}),

		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: {
				keyframes: true,
				discardComments: {removeAll: true}
			},
			canPrint: true
		})
	]);
}







// RETAILERS CONFIG

const retailers = {
	entry: {
		"retailers": ["babel-polyfill", "./src/components/ext/retailers/index.js"]
	},
	output: {
		path: __dirname + "/dist/ext",
		publicPath: "/ext/",
		filename: "[name].js?[hash]"
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
					}
				}
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
			"style": __dirname + "/src/style",
			"@": __dirname + "/src"
		}
	},
	performance: {
		hints: false
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),

		new HtmlWebpackPlugin({
			template: "src/components/ext/retailers/index.hbs",
			filename: "retailers/index.html",
			hash: production,
			title: "Sikane",
			inject: false
		}),

		new ExtractTextPlugin({filename: "[name].css", disable: true, allChunks: true}),

		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: production ? "'production'" : "'development'",
				GMAPS_KEY: JSON.stringify(process.env.GMAPS_KEY),
				API: JSON.stringify(process.env.API)
			}
		})
	],

	devtool: production ? "#source-map" : "#eval-source-map"
};

if (production) {
	retailers.plugins = retailers.plugins.concat([
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "retailers/report/index.html"
		}),

		new UglifyJsPlugin({
			parallel: true,
			sourceMap: true
		}),

		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: {
				keyframes: true,
				discardComments: {removeAll: true}
			},
			canPrint: true
		})
	]);
}


module.exports = [app, retailers];
