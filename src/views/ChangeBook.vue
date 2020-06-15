<template>
    <div class="change-book">
        <div class="fixed">
            <div class="header">
                <span class="header-item back" @click="back">👈</span>
                <span class="header-item item-book">
                    <span :class="{active:isBook}">词书</span>
                </span>
                <!-- <span class="header-item">
                    <span>词单</span>
                </span> -->
            </div>
        </div>
        <div class="random-item">
            <span class="book-style" @click="selectBook($event,0)" :class="{active:current_classify==0}">热门</span>
            <span class="book-style"
            @click="selectBook($event,item.classify)"
            v-for="item in allBook"
            :key="item.index"
            :class="{active:item.classify==current_classify}"
            >{{item.classify_name}}</span>
            
        </div>
        <!-- 书本展示 -->
        <div class="show">
            <div class="type">
                {{
                    current_classify==0? "热门"
                    :current_classify==1? "小学"
                    :current_classify==2? "初中"
                    :current_classify==3? "高中"
                    :current_classify==4? "四级"
                    :current_classify==6? "六级"
                    :"热门"
                }}
                <i>（共{{current_classify==0? totalLength : current_books.length}}本）</i>
            </div>
            <ul class="show-wrap" >
                <li class="show-item"
                  @click="bookDetail($event,item.classify,item.name,item.book_src)"
                   v-for="item in current_books" :key="item.index" v-show="current_classify==0">

                    <div class="left-img">
                        <img :src="item.book_src" alt="">
                    </div>
                    <div class="right-info">
                        <div class="title">{{item.name}}核心词</div>
                        <span>单词量{{item.length}}</span>
                        
                    </div>
                </li>
                <li class="show-item" @click="bookDetail($event,current_classify,item.name,item.book_src)" v-for="item in current_books" :key="item.name" v-show="current_classify != 0">
                   
                    <div class="left-img">
                        <img :src="item.book_src" alt="">
                    </div>
                    <div class="right-info">
                        <div class="title">{{item.name}}核心词</div>
                        <span>单词量{{item.length}}</span>
                        
                    </div>
                </li>
            </ul>
            <!-- <ul  class="show-wrap" v-else >
                <li class="show-item" @click="bookDetail($event,current_classify,item.name,item.book_src)" v-for="item in book" :key="item.name">
                    <div class="left-img">
                        <img :src="item.book_src" alt="">
                    </div>
                    <div class="right-info">
                        <div class="title">{{item.name}}核心词</div>
                        <span>单词量{{item.length}}</span>
                        
                    </div>
                </li>
            </ul> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            active:true,
            isBook:true,
            allBook: {
                "classify1":{},
                "classify2":{},
                "classify3":{},
                "classify4":{},
                "classify6":{},
            },
            totalLength:0,
            length: 0,
            book:{},
            books:{},
            current_books:{},
            current_classify: 0,
            /**
             * 所有的四级书
            books: { "classify_name":"四级",
                    "classify":4,
                    data:[
                        [],
                        []
                    ]
                    
                }
            */
            book_classify_name:'热门',
            
        }
    },
    mounted(){
        
        
        this.$nextTick(()=>{
            if(localStorage.getItem('length')){
                this.current_classify = localStorage.getItem('current_classify');
                // console.log(this.current_classify)
            }
            if(!localStorage.getItem('allBook')){
                // console.log("访问网络")
                this.axios.get('/api/allword?classify=' + 0)
                .then((data)=>{
                    let allBook = data.data.allWord;
                    let arr = [];
                    let index = 0;
                    let j = 0;

                    for(let item in allBook){

                        let length = allBook[item].data.length;
                        let classify_name = allBook[item].name;
                        let classify = allBook[item].classify;
                        let data = [...allBook[item].data];
                        let books = [];


                        for(let i = 0; i< data.length; i++){
                            // let src = data[i].book_src;
                            this.totalLength++;
                            let obj = {
                                "classify":classify,
                                ...data[i],
                                index: j++,
                                "book_src": require('../img/classify'+ allBook[item].classify +'_'+(i)+'.jpg'),
                                "length":data[i].data.length,
                                "data": data[i].data
                                };
                            books.push(obj)
                            arr.push(obj);
                        }
                        
                        
                        this.allBook[item] = {
                            index: index ++,
                            length,
                            classify_name,
                            classify,
                            // book_src,
                            books: [...books]
                        }
                        localStorage.setItem('allBook',JSON.stringify(this.allBook))
                    }
                    this.books = [...arr]
                    this.current_books = [...arr];
                    localStorage.setItem('totalLength',this.totalLength)
                    localStorage.setItem("books",JSON.stringify(this.books))
                })
            }else{
                this.totalLength = localStorage.getItem('totalLength')
                this.books = JSON.parse(localStorage.getItem('books'))
                if(localStorage.getItem('current_books')){
                    this.current_books = JSON.parse(localStorage.getItem('current_books'))
                    if(this.current_books.length<=0){
                        this.current_books = JSON.parse(localStorage.getItem('books'))
                    }
                }
                
                this.allBook = JSON.parse(localStorage.getItem('allBook'))
                this.length = localStorage.getItem('length')
            }
            
        })
    },
    computed:{
        total(){
            return this.$store.state.total
        },
        // allWord(){
        //     return {
        //         "classify1":{},
        //         "classify2":{},
        //         "classify3":{},
        //         "classify4":{},
        //         "classify6":{},
        //     }
                

        // }
        // current_classify:{
        //     get(){
        //         return localStorage.getItem('current_classify') || this.current || 0;
        //     },
        //     set(){

        //     }
        // }
    },
    methods:{
        back(){
            this.$router.back()
        },
        bookDetail(e,current_classify,current_name,book_src){
            // this.$store.state.classify = num;
            
            this.$router.push('/changebook/bookdetail?classify=' + current_classify +"&name="+current_name + "&book_src=" + book_src)
        },
        selectBook(e,classify){
            
            this.current_classify = classify;
            this.current_books = {};
            if(this.current_classify == 0){
                this.current_books = {...this.books};
                return
            }
            for(let item in this.allBook){
                
                if(this.allBook[item].classify == this.current_classify){
                    this.current_books = this.allBook[item].books;
                    this.length = this.current_books.length;
                }
            }
        }
    },
    beforeDestroy(){
        if(!this.current_classify){
            localStorage.setItem("current_classify",0)
        }else{
            localStorage.setItem("current_classify",this.current_classify)

        }
        if(this.books.length>0){
            this.current_books = this.books.filter(item=>{
                return item.classify == this.current_classify;
            })
            localStorage.setItem('current_books',JSON.stringify(this.current_books))
        }
    }
}
</script>

<style lang="scss">
    .change-book{
        
        width:100vw;
        background-color: #fff;

        .fixed{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 50px;
            background-color: #eee;
            .header{
                height: 50px;
                width: 100%;
                display: flex;
                align-items: center;
                // padding-left: 10px;
                box-shadow: 0px 0px 10px 1px #ccc;

                .header-item{
                    // flex: 1;
                    height: 100%;
                    // background-color: yellow;
                    vertical-align: center;
                    align-items: center;
                    display: flex;
                    &.back{
                        width: 60px;
                        color:#323232;
                        
                    }
                    &.item-book{
                        flex: 1;
                        // display: flex;
                        // vertical-align: center;
                        // align-items: center;
                        // background-color: green;
                        // padding: 10px;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        padding-right: 60px;
                        span{
                        // padding-right: 100px;
                        // line-height:50px;
                        width: 60px;
                        // height: 80%;
                        // background-color: red;
                        font-weight: 600;
                        font-size: 20px;
                        color: #323232;
                        // text-align: center;
                        &.active{
                            border-bottom: 1px solid #f0f;
                        }
                    }
                    }
                    
                }
            }
        }
        .random-item{
            margin-top: 50px;
            padding:10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-bottom: 1px solid #eee;
            .book-style{
                // flex: 1;
                width: 20%;
                margin: 10px 5px;
                border: 1px solid #999;
                border-radius: 4px;
                font-weight: bold;
                &.active{
                    background-color: orange;
                    color: #fff;
                    border: 0;
                }
            }
        }
        .show{
            padding: 10px;
            // background-color: #eee;
            overflow: hidden;
            .type{
                text-align: left;
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                font-weight: bold;

                i{
                    font-size: 14px;
                    color: #666;
                    font-weight: 100;
                }
            }
            .show-wrap{
                // height: 100vh;
                padding: 10px 0;
                    .show-item{
                        display: flex;
                        width: 100%;
                        background-color: #fff;
                        padding: 10px 0;
                        // border-bottom: 1px solid #eee;
                        .left-img{
                            flex: 3;
                            // background-color: #eee;
                            img{
                                width: 100%;
                                padding: 10px;
                            }
                            
                        }
                        .right-info{
                            flex: 7;
                            padding: 10px;
                            // background-color: #aaa;

                        }
                    }
                }
        }
    }
</style>