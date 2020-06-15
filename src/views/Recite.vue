<template>
    <div class="recite">
        <div class="header">
            <ReciteHeader :num="num" :count="count" :review="review"/>
        </div>
        <div class="content" @click="show">
            <router-view></router-view>
            <div class="word"  @click="play">
                <span class="name" :word='src'>{{word.content}}</span>
                <div class="phonetic">
                    <span>{{ type==0? `美音 [${word.usphone}]` : `英音 [${word.ukphone}]` }}</span>
                    <span>🔈</span>
                </div>
                <audio ref="audio"></audio>

                <div class="sense" v-if="showSense">
                    <p v-for="(item,i) in word.sense" :key="i">{{item}}</p>
                </div>
            </div>
            
            <div class="word-pic">
                <img :src="word.imgUrl" alt="没有图片资源">
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-item" @click="tran">
                <img src="../img/bg_jiandan.png" alt="">
                <span class="title">太简单了</span>
            </div>
            <div class="bottom-item" @click="nextWord">
                <img src="../img/bg_renshi.png" alt="">
                <span class="title" @click="change">认识</span>
            </div>
            <div class="bottom-item"  @click="reView" >
                <img src="../img/bg_burenshi.png" alt="没有图片资源">
                <span class="title" >不认识</span>
            </div>
            <!-- <router-link class="bottom-item"  tag="div" :to='{name:"Word",params:{word:word}}'>
                <img src="../img/bg_burenshi.png" alt="没有图片资源">
                <span class="title" >不认识</span>
            </router-link> -->
        </div>
    </div>
</template>
<script>

import ReciteHeader from '../components/ReciteHeader'
export default {
    components:{
        ReciteHeader
    },
    data(){
        return {
            readed: 0, //未读
            currentWordFinish:0, //当前正在背的单词是否已经完成
            readingWords:[],
            wordArr:[],
            src:'',
            word:{
                content:'',   //单词英文
                usphone:'',   //美音
                ukphone:'',   //英音
                src:'',      
                sense:[],     //单词解释
                url:'',      
                imgUrl:'',    //图片路径
                example:'',   //例子
                exampleCh:'', //例子翻译
                exampleUrl:'' //例子发音路径
                // type:this.$store.state.type
            },
            num: localStorage.getItem('num') || this.$store.state.total,
            // classify:4,
            count:0,
            review:0,
            reviewWordArr:[],
            audio:null,
            showSense:false //展示单词意思
        }
    },
    watch:{
        word(newValue,oldValue){
            if(newValue!=oldValue){
                console.log("change")
            }
        },
        total(newValue,oldValue) {
            console.log(newValue,oldValue)
        }
    },
    computed:{
        total(){
            return this.$store.state.total
        },
        classify(){
            return this.$store.state.classify
        },
        type(){
            return this.$store.state.type
        },
        // num: {
        //     get(){
        //         if(){

        //         }
        //         return localStorage.getItem('num') 
        //     },
        //     set(val) {

        //     }
        // }

    },
    async mounted(){
        this.num = this.total;
        if(localStorage.getItem('readed')){
            this.readed = localStorage.getItem('readed')
            
        }
        if(localStorage.getItem('book')&&this.wordArr.length==0&&this.readed==0){
            this.readed = 1;
            this.wordArr = [...JSON.parse(localStorage.getItem('book')).data]
            
        }
        if(localStorage.getItem('currentWordFinish')){
            this.currentWordFinish = localStorage.getItem('currentWordFinish');
        }
        if(localStorage.getItem('wordArr')){
            this.wordArr = JSON.parse(localStorage.getItem('wordArr'))
        }
        if(this.currentWordFinish == 0){
            if(this.num>this.wordArr.length){
                this.num = this.wordArr.length
            }
            this.currentWordFinish = 1;
        }  

        if(this.wordArr.length<this.num){
            this.num = this.wordArr.length;
        }
        await this.getInfo();
        
    },
    methods:{
        
        show(){//显示单词翻译
            this.showSense = !this.showSense;
        },
        reView(){
            if(this.wordArr.length<=0){
                // this.count--;
                if(this.reviewWordArr.length>1){
                    let lastWord = this.reviewWordArr.shift();
                    this.reviewWordArr = [
                        ...this.reviewWordArr,
                        lastWord
                    ];

                }else{
                    // this.count--;

                    // this.review++;
                }
                

            }else{
                this.reviewWordArr = [
                    ...this.reviewWordArr,
                    this.wordArr[0]
                ];
                this.wordArr.splice(0,1)
                this.review++;
            }
            this.$router.push({
                name: "Word",
                params:{word:this.word,count:this.count,num:this.num,review:this.review}
            })
        },
        tran(i){
            this.axios.post('/tran?doctype=json&i='+i)
            .then(res=>{
                this.word.exampleCh = res.data.translateResult[0][0].tgt;
            })
        },
        play(){
            
            if(this.audio){
                this.audio.pause();
                this.audio = null;
            }
            this.audio = new Audio();
            this.audio.src = this.word.src;

            this.audio.oncanplay = ()=>{
                this.audio.play();
            }
            
        },
        async getInfo(){
            
            // 每当得到缓存的数据之后清除缓存
            if(localStorage.getItem('review')){
                this.review = Number(localStorage.getItem('review'))
                localStorage.setItem('review', '')
            }
            if(localStorage.getItem('count')){
                this.count = Number(localStorage.getItem('count'))
                localStorage.setItem('count', '')

            }
            if(localStorage.getItem('wordArr')){
                this.wordArr = JSON.parse(localStorage.getItem('wordArr'));
                localStorage.setItem('wordArr', '')
            }
            if(localStorage.getItem('reviewWordArr')){
                this.reviewWordArr = JSON.parse(localStorage.getItem('reviewWordArr'));
                localStorage.setItem('reviewWordArr', '')
            }

            //没有数据请求网络
            if(this.wordArr.length==0 && this.reviewWordArr.length == 0){
                //提示重新背或者选择书籍
                
                let i = prompt("选择新书籍或重新背诵",'新书籍1,重新')
                if(i==1){
                    this.$router.replace('/changebook')
                    return
                }else {
                    this.readed = 0;
                    this.$router.replace('/')
                    return
                }
                
                
            }

            this.word.content = this.wordArr.length>0? this.wordArr[0] : this.reviewWordArr[0];
            //请求单个单词的详细数据
            /**
             *  word:{
                    content:'',   //单词英文
                    usphone:'',   //美音
                    ukphone:'',   //英音
                    src:'',      
                    sense:[],     //单词解释
                    url:'',      
                    imgUrl:'',    //图片路径
                    example:'',   //例子
                    exampleCh:'', //例子翻译
                    exampleUrl:'' //例子发音路径
                    // type:this.$store.state.type
                },
             */
            this.word.src = this.src = "http://dict.youdao.com/dictvoice?type="+this.type+"&audio=" + this.word.content;
            this.axios.get('/query?q='+this.word.content)
            .then(res=>{
                this.word.usphone = res.data.simple.word[0].usphone;
                this.word.ukphone = res.data.simple.word[0].ukphone;
                // 例句
                if(res.data.media_sents_part){
                    var sents = res.data.media_sents_part.sent;
                    for(var i=0;i<sents.length; i++){
                        if(sents[i]["@mediatype"]=="audio"){
                            this.word.example = sents[i].eng;
                            this.word.exampleUrl = sents[i].snippets.snippet[0].streamUrl;
                            this.word.example = sents[i]["eng"].replace('<b>','').replace('</b>','');
                            this.tran(this.word.example);
                            break;
                        }
                    }
                    
                }else{
                    this.word.exampleUrl = '';
                    this.word.example = '';
                }
                if(res.data.pic_dict && res.data.pic_dict.pic.length>0){
                    this.word.imgUrl = res.data.pic_dict.pic[0].url
                }else{
                    console.log('没有图片资源');
                    this.word.imgUrl = require('../img/404error.png')
                }
                let sense = res.data.ec.word[0].trs;
                if(sense){
                    this.word.sense = [];
                    for(let i=0; i<sense.length; i++){
                        this.word.sense.push(sense[i].tr[0].l.i[0])
                    }
                }
            })
            .then(()=>{
                this.$nextTick(()=>{
                    this.play()
                })
            })
 
        },
        change(){
            this.word.name = Math.random()
        },
        async nextWord(){
            
            this.showSense = false;
            if(this.wordArr.length<=0){
                if(this.review> 0){
                    this.review--;
                }
            }else{
                // this.count++;
            }

            if(this.count< this.num){
                this.count++;
            }

            if(this.wordArr.length>0){
                this.reviewWordArr.length
                this.wordArr.splice(0,1)
            }else{
                
                this.reviewWordArr.length
                if(this.reviewWordArr.length>0){
                    this.reviewWordArr.length
                    this.reviewWordArr.splice(0,1)
                }
            }
             if(this.count>= this.num){
                alert("您已完成本次练习，请休息一会")
                this.count = 0;
                this.currentWordFinish = 0;
                localStorage.setItem('count',this.count)
                
                this.review = 0;
                if(this.audio){
                    this.audio.pause();
                    this.audio = null
                }
                this.$router.back()
                return
            }
            await this.getInfo()
           
        }
    },
    beforeDestroy(){
        
        if(this.wordArr.length>0){
            let stringifyWordArr = JSON.stringify(this.wordArr);
            localStorage.setItem('wordArr',stringifyWordArr)
            
        }
        if(this.reviewWordArr.length>0){
            localStorage.setItem('reviewWordArr',JSON.stringify(this.reviewWordArr))
        }
        localStorage.setItem('review',this.review)
        localStorage.setItem('count',this.count)
        localStorage.setItem('readed',this.readed);
        localStorage.setItem("currentWordFinish",this.currentWordFinish);
    }
}
</script>
<style lang="scss" scoped>
    .recite{
        height: 100vh;
        width: 100vw;
        padding: 70px 0 150px;
        .header{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 70px;
        }
        .content{
            height: 100%;
            width: 100vw;
            overflow: hidden;
            // background-color: chartreuse;

            .word{
                height: 200px;
                max-height: 200px;
                background-color: #fff;
                text-align: center;
                padding-top: 40px;
                .name{
                    font-weight: bold;
                    font-size: 30px;
                }
                .phonetic{
                    font-size: 14px;
                    color: #323232;
                    span{
                        padding-right: 10px;
                    }
                }
                .sense{
                    width: 200px;
                    margin: 10px auto;
                    // background-color: #333;
                    // padding: 10px 0 0 50px;
                    font-size: 14px;
                    text-align: left;
                    

                }
            }
            
            .word-pic{
                height: 220px;
                // background-color: cornflowerblue;
                text-align: center;
                // vertical-align: bottom;
                img{
                    height: 100%;
                    padding: 20px;
                }
            }
        }
        .bottom{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 150px;
            padding: 0 20px 20px;
            // background-color: #eee;
            display: flex;
            // opacity: 0.3;
            .bottom-item{
                padding: 10px;
                margin: 10px 20px;
                // height: 150px;
                display: flex;
                flex-direction: column;
                text-align: center;
                font-size: 16px;
                border-radius: 10px;
                background-color: #fff;
                box-shadow: 0 0 5px #ccc;
                img{
                    width: 100%;
                    margin-bottom: 10px;
                    // height: 100%;
                }
            }
        }
    }
</style>