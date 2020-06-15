<template>
    <div class="book-detail">
        <div class="fixed-box">
            <div class="box">
                <span class="back" @click="back">back</span>
            </div>
        </div>
        <div class="header">
            <div class="img">
                <img :src="book.book_src" alt="图片加载失败">
            </div>
            <div class="title-wrap">
                <div class="title">{{book.name}}词汇</div>
                <div class="count">单词量：{{book.bookTotal}}</div>
            </div>
        </div>
        <div class="wrap">
            <div class="wrap-head">
                <div class="head-item active">
                    <span>{{wordArr.length}}</span>
                    <span>陌生词</span>
                </div>
                <div class="head-item">
                    <span>{{0}}</span>
                    <span>记忆中</span>
                </div>
                <div class="head-item">
                    <span>{{0}}</span>
                    <span>掌握词</span>
                </div>
                <div class="head-item ">
                    <span>{{0}}</span>
                    <span>标记词</span>
                </div>
            </div>
            <WordList :words="words"/>
            
        </div>
        <div class="fixed-btn">
            <div class="start" @click="start">开始练习</div>
        </div>

    </div>
</template>
<script>
import WordList from '../components/WordList'
export default {
    components:{
        WordList
    },
    data(){
        return {
            wordArr: [],
            words: [],
            audio: null,
            classify: 0,
            
            book:{
                bookTitle: '',
                bookTotal: 0,
                book_src:''
            }
        }
    },
    mounted(){
        this.$nextTick(()=>{
            let query = this.$route.query;
            this.classify = query.classify;
            this.book.name = query.name;
            this.book.book_src = query.book_src;
            this.axios.get('/api/allword?classify='+this.classify)
            .then(data=>{
                this.wordArr = data.data.words.filter((item)=>{
                    return item.name == query.name;
                })[0].data;
                this.book.bookTotal = this.wordArr.length;
                this.book.classify = this.classify;
                this.book.data = data.data.words[0].data
                this.$store.state.classify = this.classify;
                this.words = this.wordArr.slice(0,10)
            })
            
        })
    },
    methods: {
        back(){
            this.$router.back();
        },
        start(){
            let obj = {
                classify:this.book.classify,
                name:this.book.name,
                process:0,
                total:this.book.bookTotal,
                book_src:'/img/classify1_0.921d7247.jpg'
            }
            this.$store.state.classify = this.classify;

            //记录当前正在背的书，和历史背过的书
            if(this.$store.state.current.name){
                if(this.$store.state.current.name == this.book.name){
                    return
                }else{

                    this.$store.state.history = [
                        ...this.$store.state.history,
                        this.$store.state.current
                    ];
                    this.$store.state.current = {...obj}
                }
            }else{
                this.$store.state.current = {...obj}
            } 
            // console.log(this.$store.state.current)
            alert("选择新词本成功")
            //选中书籍时，将书籍设置为主页面背单词详情
            localStorage.setItem('book',JSON.stringify(this.book))
            //将正在背的记录移出
            localStorage.setItem('count','')
            localStorage.setItem('currentWordFinish',0)
            localStorage.setItem('wordArr','')
            //将当前书籍设置为第一次未读
            localStorage.setItem('readed',0)
            this.$router.replace('/')
        }
    },
    beforeDestroy(){
        
        // localStorage.setItem('bookTitle',this.bookTitle)
    }
}
</script>
<style lang="scss">
    .book-detail{
        width: 100vw;
        // height: 100vh;
        // padding-top: 50px;
        position: relative;
        left: 0;
        top: 0;

        .header{
            // margin-top: 50px;
            margin-top: 50px;
            height: 200px;
            width: 100%;
            // opacity: 0.5;
            display: flex;
            background: linear-gradient(to bottom,#ff0,#fff);
            .img{
                max-width: 120px;
                height: 200px;
                
                img{

                    width: 100%;
                    height: 90%;
                    padding: 15px 10px;
                   

                }
            }
            .title-wrap{
                flex: 1;
                padding-top: 15px;
                .title{
                    height: 50px;
                    font-size: #000;
                    font-weight: 700;
                }
                .count{
                    font-size: 12px;
                    color: #666;
                }
            }
        }
    }
    .fixed-box{
        position: fixed;
        width: 100vw;
        height: 50px;
        left: 0;
        top: 0;
        .box{
            height: 50px;
            width: 100%;
            background:linear-gradient(to bottom,#fe0,#ff0);
            display: flex;
            align-items: center;
            padding-left: 10px;
            // box-shadow: 0px 0px 10px 1px #ccc;

            
        }
    }

    .wrap{
        width: 100vw;
        margin-bottom: 70px; //给开始练习腾出空间
        // background-color: #eee;
        .wrap-head{
            width:100%;
            height: 50px;
            // background-color: #eee;
            display: flex;
            .head-item{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #333;
                span{
                    font-size: 14px;
                    &:first-child{
                        font-size: 18px;
                    }
                    
                }
                &.active{
                    color: orange;
                }
                
            }
        }

        //内容区
        .content{
            width: 100%;

            .content-item{
                width: 100%;
                padding-left: 10px;
                padding-right: 10px;
                height: 50px;
                // background-color: #eee;
                border-bottom: 1px solid #ccc;

                display: flex;
                // justify-content: center;
                align-items: center;
                .item-word{
                    flex: 1;
                    font-size: 14px;
                }
                .like,.play{
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    // background-color: red;
                    margin-left: 10px;
                }

            }

        }

    }

    .fixed-btn{
        width: 100vw;
        height: 70px;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #eee;
        .start{
            margin: 10px auto;
            width: 80%;
            height: 50px;
            border-radius: 30px;
            line-height: 50px;
            text-align: center;
            background-color: orange;
            color: #fff;
        }
    }

    


</style>