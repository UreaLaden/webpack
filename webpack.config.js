const path = require('path'); //Cannot use ECMA script modules in this file

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist'),
        publicPath:'dist/'
        //publicPath:'auto' //This happens behind the scenes with Webpack5
    },
    mode: 'none',
    module:{
        rules:[
            {
                test:/\.(png|jpg)$/, //Does the file contain png or jpg
                type: 'asset', //asset/resource, asset/inline,asset/source,asset
                parser:{
                    dataUrlCondition:{ // asset/inline < 3 > asset/resource
                        maxSize: 3 * 1024 // 3 kilobytes
                    }
                }
            },
            {
                test:/\.txt/,
                type:'asset/source' // Webpack reads text file in as js string
            }
        ]
    }
};