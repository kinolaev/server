const path = require('path');
const merge = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');

const accessibility = require('./apps/accessibility/webpack');
const comments = require('./apps/comments/webpack');
const core = require('./core/webpack');
const files = require('./apps/files/webpack')
const files_sharing = require('./apps/files_sharing/webpack');
const files_trashbin = require('./apps/files_trashbin/webpack');
const files_versions = require('./apps/files_versions/webpack');
const oauth2 = require('./apps/oauth2/webpack');
const settings = require('./settings/webpack');
const systemtags = require('./apps/systemtags/webpack');
const twofactor_backupscodes = require('./apps/twofactor_backupcodes/webpack');
const updatenotifications = require('./apps/updatenotification/webpack');
const workflowengine = require('./apps/workflowengine/webpack');

module.exports = []
	.concat(
		accessibility,
		comments,
		core,
		files_sharing,
		files_trashbin,
		files_versions,
		files,
		oauth2,
		settings,
		systemtags,
		twofactor_backupscodes,
		updatenotifications,
		workflowengine
	)
	.map(config =>
		merge.smart({
			module: {
				rules: [
					{
						test: /\.css$/,
						use: ['style-loader', 'css-loader']
					},
					{
						test: /\.scss$/,
						use: ['style-loader', 'css-loader', 'sass-loader']
					},
					{
						test: /\.js$/,
						loader: 'babel-loader',
						exclude: /node_modules/
					},
					{
						test: /\.vue$/,
						loader: 'vue-loader'
					},
					{
						test: /\.(jpe?g|png|gif|svg)$/,
						loader: 'url-loader',
						options: {
							name: '[name].[ext]?[hash]',
							limit: 8192
						}
					},
					{
						test: /\.handlebars/,
						loader: "handlebars-loader",
						query: {
							extensions: '.handlebars'
						}
					}
				]
			},
			plugins: [
				new VueLoaderPlugin()
			],
			resolve: {
				alias: {
					OC: path.resolve(__dirname, './core/src/OC'),
					OCA: path.resolve(__dirname, './core/src/OCA'),
					// direct apps
					Files: path.resolve(__dirname, './apps/files/src'),
					// make sure to use the handlebar runtime when importing
					handlebars: 'handlebars/runtime'
				},
				extensions: ['*', '.js', '.vue', '.json']
			}
		}, config)
	);
