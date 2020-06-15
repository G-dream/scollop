const allWord = require('./src/data.json');
const word1 = allWord.classify1.data; //小学
const word2 = allWord.classify2.data; //初中
const word3 = allWord.classify3.data; //高中
const word4 = allWord.classify4.data; //四级
const word6 = allWord.classify6.data; //六级
let count = 0;
module.exports = {
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */ 
    /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
    //publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    //outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
   // assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
   // productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
   // filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    //lintOnSave: true,
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        //open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        //host: '0.0.0.0',
        //port: 8066,
        //https: false,
        //hotOnly: false,
        /* 使用代理 */
        // proxy: {
        //     '/api': {
        //         /* 目标代理服务器地址 */
        //         target: 'http://47.100.47.3/',
        //         /* 允许跨域 */
        //         changeOrigin: true,
        //     },
        // },
    },
    configureWebpack:{
        devServer:{
            before(app) {
                app.get('/api/words',function(req,res){
                    
                    res.json({
                        data:word4
                    })
                }),
                app.get('/api/simpleword',function(req,res){
                    console.log(req.query)
                    count = count + 1;
                    let num = Number(req.query.num);
                    let classify = Number(req.query.classify);
                    let name = req.query.name;
                    // let classify = Number(req.query.classify);
                    let data ;
                    switch(classify){
                        case 1 :
                            data = word1.data;
                            break;
                        case 2 :
                            data = word2.data;
                            break;
                            case 3 :
                            data = word3.data;
                            break;
                        case 4:
                            data = word4.data;
                            break;
                        case 6 :
                            data = word6.data;
                            break;
                        default :
                            data = word4.data;
                            break;
                    }
                    for(var i =0;i<data.length; i++){
                        if(data[i].name == name){
                            data = data[i];
                            break;
                        }
                    }
                    console.log(data)
                    let wordArr = [];
                    if(num * (count-1) <data.length){
                        wordArr = data.slice((count-1) * num ,num * count)
                    }else{
                        console.log("超出了")
                        count = 1;
                        wordArr = data.slice((count-1) * num ,num * count)
                    }
                    // data = word4;
                    // if(!isSort){
                    //     console.log(isSort)
                    //     var isSort = true;
                    //     data.sort(() => {
                    //         return Math.random() - 0.5;
                    //     })

                    // }
                   

                    // let random = Math.floor(data.length * Math.random());

                    // let wordArr = [];
                    // console.log(data.length)
                    

                    // for(var i=0;i<num; i++){
                    //     let word = data.splice(0,1);
                    //     wordArr.push(...word)
                    // }
                    // wordArr = data.slice((count-1) * num ,num * count)
                    // if(count * num > data.length && (count - 1) * num < data.length){
                    //     console.log("超出了")
                    //     count = 0;  //为下次做准备
                    //     console.log(count)
                    // }
                    console.log(data)
                    console.log(wordArr)

                    // wordArr = [...data]
                    // data.slice(0,num).forEach(t=>{
                    //     wordArr.push(t.content)
                    // })
                    // let word = data[random].content;
                    
                    res.json({
                        // word:word,
                        wordArr:wordArr
                    })
                })
                app.get('/api/allword',function(req,res){
                    var classify = req.query.classify;
                    console.log(classify)
                    if(classify && classify!=0){
                        let words = allWord["classify" + classify].data;
                        res.json({
                            words:words
                        })
                    }else if(classify==0){
                        console.log("get")
                        let all = allWord;
                        res.json({
                            allWord: all
                        })
                    }
                    
                    
                })
                // app.get('http://dict.youdao.com/dictvoice?type=3&audio=',function(req,res){
                //     // res.send()
                // })
                
            },
             proxy: {
                '/tran': { //   /search?doctype=json&  q=
                    /* 目标代理服务器地址 */
                    target: 'http://fanyi.youdao.com/translate',
                    /* 允许跨域 */
                    doctype:JSON,
                    changeOrigin: true,
                    pathRewrite:{"^/tran":''}
                },
                '/search/': {
                    target:"http://dict.youdao.com/suggest",
                    doctype:JSON,
                    changeOrigin: true,
                    pathRewrite:{"^/search":''}

                },
                '/query': {
                    target:'http://dict.youdao.com/jsonapi',
                    doctype:JSON,
                    changeOrigin: true,
                    pathRewrite:{"^/query":''}
                },
                '/word/play': {
                    target: "http://dict.youdao.com/dictvoice",
                    doctype:JSON,
                    changeOrigin: true,
                    pathRewrite:{"^/word/play":''}
                }

            }
        }
    }
}