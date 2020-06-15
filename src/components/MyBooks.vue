<template>
    <div class="my-books">
        <div class="books-header">
            <div class="back" @click="back">👈</div>
            <div class="title">我的词书</div>
        </div>
        <div class="content">
            <div class="studying" >
                <div class="studying-title">正在学习</div>
                <!-- 循环元素 -->
                <div class="book" @click="bookDetail($event,current_book.classify,current_book.name,current_book.book_src)" v-show="current_book.name">
                    <div class="book-img">
                        <img src="../img/classify1_1.jpg" alt="">
                    </div>
                    <div class="book-content">
                        <span class="book-name">{{current_book.name}}</span>
                        <div class="book-detail">
                            <span>单词量：{{current_book.total}}</span>
                            <span>进程：{{(current_book.process / current_book.total * 100).toFixed(2)}}%</span>
                        </div>
                        <div class="change-book">
                            <router-link to="/changebook" tag="div" class="change">换本书背</router-link>
                        </div>
                    </div>
                </div>
                <div class="book" v-show="current_book.name==undefined">没有正在背的书</div>
               
            </div>

            <div class="studyed">
                <div class="studying-title">之前背过</div>
                <!-- 循环元素 -->
                <div class="book" 
                v-show="history.length>0"
                v-for="item in history" 
                :key="item.name" 
                @click="bookDetail($event,item.classify,item.name,item.book_src)">
                    <div class="book-img">
                        <img src="../img/classify1_1.jpg" alt="">
                    </div>
                    <div class="book-content">
                        <span class="book-name">{{item.name}}</span>
                        <div class="book-detail">
                            <span>单词量：{{item.total}}</span>
                            <span>进程：{{(item.process / item.total * 100).toFixed(2)}}%</span>
                        </div>
                        <div class="change-book">
                            <router-link to="/changebook" tag="div" class="change">换本书背</router-link>
                        </div>
                    </div>
                </div>

                <div class="book" v-show="history.length == 0">没有之前背的书</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        back(){
            this.$router.back()
        },
        bookDetail(e,current_classify,current_name,book_src){
            //跳转详情页面
            this.$router.push('/changebook/bookdetail?classify=' + current_classify +"&name="+current_name + "&book_src=" + book_src)
        }
    },
    mounted(){
    },
    computed:{
        history(){
            return this.$store.state.history.filter(item=>{
                return item.name != this.current_book.name
            })
        },
        current_book(){
            return this.$store.state.current
        }

    
    }
}
</script>

<style lang="scss">
    .my-books{
        width: 100vw;
        // padding: 0 10px;
        // height: 150vh;
        padding-top: 70px;
        background-color: #eee;

        .books-header{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            padding: 0 10px;
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #aaa;
            .back{
                width: 40px;
            }
            .title{
                flex: 1;
                font-size: 20px;
                font-weight: 600;
                // background-color: #ccc;
                // text-align: center;
                padding: 0 20px;
            }
        }

        .content{
            width: 100vw;
            // overflow: hidden;
            // height: 100px;
            
            .studying,.studyed{
                width: 100vw;
                // padding: 0 10px;
                .studying-title{
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    color:#666;
                    padding-left: 10px;

                }
                .book{
                    width: 100%;
                    height: 150px;
                    padding: 10px;
                    background-color: #fff;
                    border-bottom: 1px solid #ccc;
                    display: flex;

                    .book-img{
                        width: 100px;
                        height: 100%;
                        img{
                            width: 100%;
                            padding: 2px;
                        }
                    }
                    .book-content{
                        // background-color: #f0f;
                        flex: 1;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 100%;
                        padding-left: 10px;
                        display: flex;
                        .book-name{
                            font-size: 20px;
                            font-weight: 700;
                            height: 40px;
                            line-height: 40px;
                        }
                        .book-detail {
                            width: 100%;
                            font-size: 14px;
                            span{
                                margin-right: 10px;
                            }
                        }
                        .change-book{
                            width: 100%;
                            height: 40px;
                            // background-color: #f0f;
                            .change{
                                width: 100px;
                                margin: 5px ;
                                height: 30px;
                                line-height: 30px;
                                border-radius: 4px;
                                text-align: center;
                                color: #fff;
                                background-color: orangered;
                            }
                        }
                    }
                }
            }
        }
    }
</style>