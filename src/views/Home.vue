<template>
  <div id="app">
    <!-- search -->
    <div class="search">
      <router-link to='/search' class="search-veiling" tag='div'>搜索</router-link>
    </div>
    
  <!-- <input type="text"> -->
 

    <!-- 轮播图 -->
    <div class="swiper-wrapper"  @touchstart="touchstart" @touchend="touchend" >
        <ul class="swiper-ul">
          <transition-group name="flow" tag='div' >
            <li class="swiper-item" v-for="(s,i) in swiperList" :key='i' v-show="i===isShow" >
              <router-link to='/ad' class="swiper-link">
                <img :src="s" alt="" class="swiper-img">
              </router-link>
            </li>
          </transition-group>
        </ul>
      
    </div>
    <!-- <div class="search">jslgj</div> -->
    <!-- <WhiteSpace /> -->
    <!-- 正在背单词 -->
    <div class="recite">
      <div class="recite-header">
        <span class="recite-tip">当前在背</span>
        <router-link class="change-book-btn" to="/changebook">换本书背</router-link>
      </div>
      <!-- 内容展示 -->
      <div class="recite-box">
        <div class="recite-content">
          <div class="recite-content-left">
            <img class="recite-img" :src="book.book_src" alt="图片加载失败">
          </div>
          <div class="recite-content-right">
            <div class="book-title">{{book.name || "选项书籍"}}词汇</div>
            <span class="book-count">
              <i>词汇量：</i>{{book.bookTotal}}
            </span>
            <div class="book-process">
              <p class="process" :style="{width:(book.bookTotal - wordArr.length) / book.bookTotal * 100 + '%'}"></p>
            </div>
            <div class="study-process">
              <!-- <div class="process-item">
                <i class="icon">👉</i>
                <span class="familiar">熟悉0%</span>
              </div> -->
              <div class="process-item">
                <i class="icon">👉</i>-
                <span class="familiar">已背{{book.bookTotal - wordArr.length}}个</span>
              </div>
              <div class="process-item">
                <span class="icon">👉</span>
                <span class="familiar total">总量{{book.bookTotal }}个</span>
              </div>
            </div>
          </div>
        </div>
        <div class="recite-bottom">
          <router-link to="/recite" tag="div" class="study" > 开始练习</router-link>
        </div>
      </div>
      
    </div>
    <!-- 我的词书词单 -->
    <div class="my-book">
      <div class="book-header">我的词书</div>
      <ul class="book-content">
        <!-- <li class="book-item">
          <div class="book-pic">
          </div>
          <div class="book-tip">
            <h4>上传及同步词单</h4>
            <span>上传词单及同步有道词典单词书</span>
          </div>
          <div class="book-enter"></div>
        </li> -->
        <router-link tag="li" to="/mybooks" class="book-item">
          
          <div class="book-pic">
          </div>
          <div class="book-tip">
            <h4>我的词书</h4>
            <span>正在学习的词书在这里</span>
          </div>
          <div class="book-enter"></div>
        </router-link>
      </ul>
    </div>

    <!-- 底部固定 -->
    <div class="footer" @change-color="changeColor">
      <Footer :colorIndex="colorIndex" />
    </div>
  </div>
</template>
<script>
import Footer from '../components/Footer'
export default {
  components:{
    // Word
    // WhiteSpace
    // Search,
    Footer
  },
  mounted(){
    clearInterval(this.timer)
    this.timer = null;
    this.timer = setInterval(()=>{
      if(this.isShow==this.swiperList.length-1){
        this.isShow = 0;
      }else{
        this.isShow++;
      }
    },3000);
    if(localStorage.getItem('wordArr')){
      this.wordArr = JSON.parse(localStorage.getItem('wordArr'))
    }
    if(localStorage.getItem('book')){
      this.book = JSON.parse(localStorage.getItem('book'))
    }
    
  },
  methods:{
    touchstart(){
      clearInterval(this.timer)
      this.timer = null
    },
    touchend(){
      clearInterval(this.timer)
      this.timer = null;
      this.timer = setInterval(()=>{
        if(this.isShow==this.swiperList.length-1){
          this.isShow = 0;
        }else{
          this.isShow++;
        }
      },3000);
    },
    changeColor() {
      this.colorIndex = !this.colorIndex;
    }

  },
  beforeDestory(){
    clearInterval(this.timer)
    this.timer = null;
  },
  data(){
    return{
      swiperList:[
        // require("../img/t4.jpg"),
        require("../img/t1.jpg"),
        require("../img/t2.jpg"),
        require("../img/t3.jpg"),
        require("../img/t4.jpg")
      ],
      isShow:0,
      show:true,
      colorIndex: true, //底部切换用的
      
      book: {
        bookTitle: '',
        bookTotal: 0,
        book_src:'',
        name:''
      },
      wordArr:[]
    }
  }
  
}
</script>

<style lang="scss">
*{
  margin: 0;
}

#app {
  text-align: center;
  color: #2c3e50;
  background-color: #fcfcfc;
  padding-bottom: 50px;
  width:100vw;

  .search{
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 50px;
    padding: 5px 20px;
    .search-veiling{
      widows: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 15px;
      color: #999;
      background-color: #eee;

    }
  }
  .recite{
    padding: 0 10px;
    width: 100vw;

    .recite-header{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 5px;
      .recite-tip{
        // width: 100px;
        flex: 1;
        text-align: left;
        color:#323232;
        font-size: 18px;
        font-weight: 600;
      }
      .change-book-btn{
        width: 60px;
        height: 26px;
        font-size: 12px;
        line-height: 26px;
        
        color: #323232;
        border: 1px solid #666;
        border-radius: 10px;
      }
    }
    .recite-box{
      padding: 10px;
      box-shadow: 0px 0px  10px #Ccc;
      background-color: #fff;
      border-radius: 10px;
      .recite-content{
        display: flex;
        
        .recite-content-left{
          height: 160px;
          flex: 3;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffd;
          .recite-img{
            width: 100%;
            height: 100%;
          }
        }
        .recite-content-right{
          // height: 200px;
          flex: 5;
          padding: 10px;
          text-align: left;
          .book-title{
            font-size: 14px;
          }
          .book-count{
            font-size: 10px;
            color: #999;
          }
          .book-process{
            width: 100%;
            height:6px;
            margin-top: 50px;
            border-radius: 3px;
            background-color: rgb(240, 226, 41);
            .process{
              height: 6px;
              border-radius: 3px;
              background-color: #f90;
            }
          }
          .study-process{
            display: flex;
            width: 100%;
            height: 20px;
            padding-top: 5px;

            .process-item{
              font-size: 12px;
              flex: 1;
              .familiar{
                color: #f90;
                &.total{
                  color: rgb(240, 226, 41);
                }
              }
            }
          }
        }
        
      }
      .recite-bottom{
        height: 50px;
        width: 100%;
        padding-top: 5px;
        .study{
          background-color: orangered;
          height: 40px;
          line-height: 40px;
          width: 100%;
          color:#fff;
          margin: 0 auto;
          
          border-radius: 20px;
        }
      }
    }
    
  }
}
//轮播图展示
  .swiper-wrapper{
    width: 100%;
    height: 150px;
    overflow: hidden;
    margin-top: 50px;
    // padding: 20px 0;

    background-color: #fcfcfc;
    .swiper-ul{
      width: 100%;
      height: 150px;
      background-color: #fff;
      // background-color: #fcfcfc;

      position: relative;
      left: 0;
      top:0;
      .swiper-item{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 150px;
        .swiper-link{
          width: 100%;
          height: 150px;
          .swiper-img{
            width: 100%;
            height: 100%;
            padding: 20px ;
          }
        }
        
      }
      
    }

    .flow-enter{
      // left: 100%;
      transform: translateX(100%);

      opacity: 0;
    }
    .flow-leave,
    .flow-enter-to{
      transform: translateX(0);
      // left: 0;
      opacity: 1;
    }
    .flow-leave-to{
      transform: translateX(-100%);
      // left: -100%;

      opacity: 0;
      
    }
    .flow-enter-active,
    .flow-leave-active{
      transition: all 1s linear;
    }
  }
//我的词书词单
.my-book{
  width: 100vw;
  margin-top: 20px;
  // background-color: #ccc;
  .book-header{
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    text-align: left;
    font-size: 20px;
    font-weight: 700;
    // background-color: #fff;
  }
  .book-content{
    margin-left: 10px;
    margin-right: 10px;
    .book-item{
      display: flex;
      height: 90px;
      padding:10px 20px;
      border-radius: 10px;
      background-color: #fff;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #ccc;
      .book-pic{
        width: 60px;
        height: 60px;
        background-size: 80%;
        background-color: yellow;
        background-image:  url('../img/ic_settings_books.png');
        background-repeat: no-repeat;
        background-position: center;
      }
      .book-tip{
        flex: 1;
        height: 100%;
        // vertical-align: middle;
        text-align: left;
        padding-left: 10px;

        h4{
          font-weight: bold;
          font-size: 16px;
          // line-height: 20px;
          text-align: left;
          // vertical-align: baseline;
        }
        span{
          font-size: 14px;
          text-align: left;
        }
      }
      .book-enter{
        // flex:1;
        height: 100%;
        width: 100%;
        max-height: 70px;
        max-width: 70px;
        // display: flex;
        // padding: 20px;
        // background-color: yellow;
        background-size: 80%;
        background-image:  url('../img/ic_btn_enter.png');
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
  
}
</style>