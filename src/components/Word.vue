<template>
    <div class="word">
        <!-- <h3>这是背单词页面</h3> -->
        <div class="header-wrap">
            <div class="header">
                <ReciteHeader :count="count"  :num="num" :review="review"/>
            </div>
        </div>
        <div class="word-header">
            <span class="plan">今日不再安排学习</span>
            <span class="cancel">撤销</span>
        </div>
        <div class="word-content">
            <p class="audio" @click="play(word.src)">
                <audio controls class="audio-item"  ref="audio">
            您的浏览器不支持 audio 元素。
                </audio>                                                                            
                

                <span class="text">{{word.content}}</span>
                <span class="phonetic">[{{word.usphone}}]</span>
                <span class="icon"></span>
            </p>
            
            <div class="word-define">
                <span class="en-explain">英解</span>
                <!-- 循环 -->
                <p v-for='(d,i) in word.sense' :key='i'>{{d}}</p>
            </div>
        </div>
        <div class="example-content">
            <span  style="display:block" class="example-tip">例句</span>
            <p class="en-example">
                <span class="example">{{word.example}}</span>
                <span class="icon" @click="play(word.exampleUrl)"></span>
                <span class="cn-translate">{{word.exampleCh}}</span>
            </p>
            <p class="more-example">查看更多影视例句</p>
        </div>
        <!------------------- 笔记模块-------------------- -->
        <!-- <div class="note-content">
            <p class="note-tip">
                <span class="tip">笔记</span>
                <span class="icon"></span>
            </p>
            
            <p class="en-note">
                <span class="note">I had little knowledge about German history</span>
                <span class="icon">⭐</span>
                <span class="author">作者：郭瑞南</span>
            </p>
            <p class="en-note">
                <span class="note">I had little knowledge about German history</span>
                <span class="icon">⭐</span>
                <span class="author">作者：郭瑞南</span>
            </p>
        </div> -->

        <!-- 底部固定按钮 -->
        <div class="bottom">
            <div class="bottom-left">
                <div class="cicle">0%</div>
                <div class="word-simple-info">
                    <span class="word-space">approve</span>
                    <span>掌握程度；陌生</span>
                </div>
            </div>
            <div class="next-word" @click="nextWord">下一个</div>
        </div>
    </div>
</template>
<script>
import ReciteHeader from '../components/ReciteHeader'
export default {
    // props:["count","num","review"],
    // inject: ['reload'],
    components:{
        ReciteHeader
    },
    provide(){
        return {
            reload: this.reload
        }
    },
    data(){
        return{
            word:{},
            audio:null,
            isRouterAlive:true,
            count:0,
            num:0,
            review:0
        }
    },
   
    watch:{
        word(newValue,oldValue){
            if(newValue != oldValue){
                console.log("change");
            }
            
        }
    },
    mounted(){

        this.$nextTick(()=>{
            if(!localStorage.getItem('word')){
            //本地缓存没有数据发送请求
            // this.word = {...this.$route.params.word};
            // this.count = this.$route.params.count;
            // this.num = this.$route.params.num;
            // this.review = this.$route.params.review;
            // console.log(this.word)
            // localStorage.setItem('word',JSON.stringify(this.word))
            // console.log(this.word)
            // this.play(this.word.src)
            // this.requestWordArr();
        }else{
            //将缓存数据赋值
            // this.wordArr = JSON.parse(localStorage.getItem('wordArr'));
            // this.word = JSON.parse(localStorage.getItem('word'));
            //获取新单词渲染页面
            // this.getWord()
            // console.log(this.word)
            // this.play(this.word.src)
        }
        this.word = {...this.$route.params.word};
        this.count = this.$route.params.count;
        this.num = this.$route.params.num;
        this.review = this.$route.params.review;
        this.play(this.word.src)
        // console.log(this)
        })


        
        

    },
    methods: {
        //点击下一个单词播放
        nextWord(){
            this.$router.back();
        },
        getWord(){
            let random = Math.floor(this.wordArr.length * Math.random());
            this.word =  this.wordArr[random];
            this.word.src = this.src = "http://dict.youdao.com/dictvoice?type=3&audio=" + this.word.content;
        },
        //请求单词数据
        requestWordArr(){
            //请求数据，缓存有就不请求，代码已经写在mounted 可以不用判断
            this.word = {...this.$route.params.word}
            if(localStorage.getItem('wordArr')){
                this.wordArr = JSON.parse(localStorage.getItem('wordArr'))
            }else{
                this.axios.get("/api/words")
                .then((res) => {
                this.wordArr = res.data.data || [];
                localStorage.setItem("wordArr",JSON.stringify(this.wordArr))
                })
                .then(()=>{
                    setTimeout(() => {
                        this.play(this.word.src)
                    });
                })
                .catch(err=>{
                console.log(err)
                })
            }
            
        },
        play(url){
                if(this.audio){
                    console.log("playing,停止")
                    this.audio.pause();
                    this.audio = null;
                    
                }
                console.log("播放")
                this.audio = new Audio();
                this.audio.src = url;

                this.audio.oncanplay = ()=>{
                    this.audio.play();
                }
                
            
            


        },
        
        
        back(){
            this.$router.back();
        }

    },
    beforeDestroy(){
        
        if(this.num <= this.$store.state.total){
            localStorage.setItem('num',this.num)
        }
        if(this.audio){
            this.audio.pause();
            this.audio = null;
        }
        
    }
       
}
</script>
l
<style lang="scss" scoped>
    @import "../assets/scss/icon";
    
    *{
        padding: 0px;
        margin: 0px;
    }

    .word{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 70px 0 70px;
        
        background-color: #ddd;

        .header-wrap{
            
            .header{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background-color: #fff;
            border-bottom: 1px solid #ccc;
            z-index: 100;
            // text-align: center;
            // .back{
            //     position: absolute;
            //     line-height: 50px;
            //     top: 0;
            //     left: 0;
            //     // background-color: red;
            // }
            // .mode{
            //     display: inline-block;
            //     text-align: center;
            //     line-height: 50px;
            //     font-size: 26px;
            //     font-weight: bold;
            // }
            // .search{
            //     position: absolute;
            //     top: 0;
            //     right: 30px;
            //     line-height: 50px;

            // }
            // .delete{
            //     position: absolute;
            //     width: 30px;
            //     right: 0;
            //     top: 0;
            //     line-height: 50px;
            // }
        }
        }
        
        .word-header{
            // width: 100vw;
            // background-color: red;
            height: 40px;

            line-height: 40px;
            padding-left: 5px;
            box-sizing: border-box;
            // background-color: #fff;
            text-align: left;
            .plan{
                font-size: 18px;
                margin-right: 10px;
                color:#323232;
            }
            .cancel{
                color: green;
                font-size: 16px;
            }
        }
        .word-content{
            background-color: #fff;
            box-sizing: border-box;
            margin-bottom: 5px;
            // padding: 10px;
            width: 100%;
            .audio{
                position: relative;
                // background-color: yellow;
                text-align: left;
                height: 40px;
                padding: 10px;
                vertical-align: middle;
                .audio-item{
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 40px;
                    border-radius: 20px;
                    opacity: 0.4;
                    z-index: -1;
                    // background-color: red;
                }
                .text{
                    font-size: 30px;
                    // text-align: left;
                    // display: inline-block;
                    margin-right: 10px;
                    color:#000;
                    font-weight: bold;
                }
                .phonetic{
                    font-size: 20px;
                    color: #7c7272;
                }
                .icon{
                    position: absolute;
                    display: block;
                    width:40px;
                    height: 60px;
                    right: 5px;
                    top: 10px;

                    @include  bg-icon("third",30px)
                    
                }
            }
            .word-define{
                width:100%;
                min-height: 120px;
                padding: 10px;
                box-sizing: border-box;
                // background-color: red;
                .en-explain{
                    display: block;
                    width: 100px;
                    border: 1px solid #666;
                }
                p{
                    text-align: left;
                    margin: 5px;
                    color:#333;
                }

            }

        }
        .example-content{
            box-sizing: border-box;
            width: 100%;
            min-height: 180px;
            background-color: #fff;
            position: relative;
            padding-bottom: 30px;
            margin-bottom: 5px;
            .example-tip{
                display: block;
                padding: 4px 10px;
                // width: 100px;
                text-align: left;
                border-bottom: 1px solid #aaa;
            }
            .en-example{
                // box-sizing:border-box;
                text-align: left;
                position: relative;
                
                // padding:  10px;
                // background-color: yellow;
                // height: 50px;
                .example{
                    box-sizing:border-box;
                    padding:10px;

                    display: inline-block;
                    // background-color: red;
                    width: calc(100% - 60px);
                    // width: 100%;
                }
                .icon{
                    position: absolute;
                    display: block;
                    width:40px;
                    height: 60px;
                    right: 5px;
                    top: 15px;
                    // background-color: red;

                    // overflow: hidden;
                    @include  bg-icon("third",30px);
                    .play{
                        // display: block;
                        // position: absolute;
                        // background: #ff0;
                        // // border: none;
                        
                        // // width: 40px;
                        // height: 60px;
                    }
                }
                .cn-translate{
                    display: inline-block;
                    box-sizing:border-box;
                    padding:10px;
                    // padding-top:5px;
                    // background-color: green;
                    width: calc(100% - 60px);
                }

            }
            .more-example{
                position: absolute;
                width: 100%;
                height: 30px;
                bottom: 0;
                left: 0;
                color:#999;
                font-weight: bold;
            }

        }
        //--------------------笔记------------
        .note-content{
            background-color: #fff;
            min-height: 300px;
            .note-tip{
                // width: 100px;
                text-align: left;
                border-bottom: 1px solid #aaa;
                position: relative;
                .tip{
                    display: inline-block;
                    padding: 4px 10px;
                    // background-color: red;
                }
                .icon{
                    position: absolute;
                    display: inline-block;
                    right: 0;
                    top: 10px;
                    width: 20px;
                    height: 20px;
                    background: url("../img/biz_daily_paper_icon_ppt_right_arrow.png") no-repeat;
                    background-size: 10px;
                }
            }
            .en-note{
                position: relative;
                text-align: left;
                .note{
                    display: inline-block;
                    width: calc(100% - 50px);
                    // background-color: yellow;
                     padding: 10px;
                }
                .icon{
                    position: absolute;
                    width: 30px;
                    // line-height: ;
                    right: 10px;
                    top: 10px;

                }
                .author{
                    display: block;
                    padding: 5px 10px;
                }
            }

        }
    }
    .bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 70px;
        width: 100vw;
        background-color: #fff;
        display: flex;
        align-items: center;
        border-top: 1px solid #ccc;
        // opacity: 0.4;
        .bottom-left{
            flex: 1;
            display: flex;
            // justify-content: center;
            align-items: center;
            text-align: center;
            .cicle{
                margin: 0 10px;
                width: 40px;
                height: 40px;
                line-height: 40px;
                color: #666;
                // padding: 0 10px;
                border:2px solid #ccc;
                border-radius: 50%;
            }
            .word-simple-info{
                text-align: left;
                span{
                    display: block;
                    font-weight: 200;
                    font-size: 14px;
                    color: #999;
                    &.word-space{
                        color:#333;
                    }
                }
            }
        }
        .next-word{
            width: 100px;
            height: 30px;
            line-height: 30px;
            margin-right: 10px;
            text-align: center;
            font-size: 16px;
            border-radius: 5px;
            color: #fff;
            background-color: orange;
        }
    }
</style>