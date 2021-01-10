const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		// 打包后文件
		filename: 'bundle.js',
		environment: {
			// 不使用箭头函数
			arrowFunction: false,
			// 不使用const
			const: false
		}
	},
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            'chrome': '56',
                                            'ie': '10'
                                        },
                                        // 指定corejs的版本
                                        'corejs': '3',
                                        // 使用corejs的方式，此处为按需加载
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            },
			// less文件的处理
			{
				test: /\.less$/,
				// loader由后向前倒叙执行，也就是最先执行less-loader
				use: [
					'style-loader',
					'css-loader',
					// 引入postcss
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{ 	
											// 浏览器兼容到最新的2个版本
											browsers: 'last 2 version'
										}
									]
								]
							}
						}
					},
					'less-loader'
				]
			}
        ]
    },
    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}