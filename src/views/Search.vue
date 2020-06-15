<template>
    <div class="search">
        <div class="search-header">
            <span class="back" @click="back">👈</span>
            <input type="text" class="text" ref="input" v-model="text" placeholder="请输入英文或中文">
            <!--  -->
            <span class="submit" @click="search" :class="{active:active}">搜索</span>
        </div>
        <div class="search-content" v-if="show">
            <ul class="content-list">

                <li
                 v-for="(item,i) in wordsArr.entries"
                :key="i" 
                class="content-item"
                
                >
                    <div v-if="item.entry ==wordsArr.query" :class="{same:item.entry==wordsArr.query}">
                        <div class="play">
                            <span>{{item.entry}}</span>

                            <span>音标</span>
                            <div class="icon"  @play-word="playWord">
                                <Play :word="item.entry" :le="le" @play-word="playWord"/>
                            </div>
                        </div>
                        <div class="word-explain">
                            {{item.explain}}
                        </div>
                        <!-- <div>
                            <span>例句</span>
                            <p>i had to idea the beach was so close</p>
                            <p>我不知道海滩原来这么近</p>
                        </div> -->
                    </div>
                    <div v-else class="different">
                        <span class="diff-left">{{item.entry}}</span>
                        <span class="diff-right">{{item.explain}}</span>
                        
                    </div>
                    
                </li>
                
            </ul>
        </div>
    </div>
</template>
<script>
import Play from "../components/Play"
export default {
    components:{
        Play
    },
    data(){
        return {
            active: false,
            text:'',
            wordsArr:{},
            show: false,
            same:true,
            CNPattern: /^[\u4e00-\u9fa5]+$/,
            ENpattern: /^[a-zA-Z]+$/,
            le:'eng' //汉译英
        }
    },
    mounted(){
        //页面加载自动获取焦点
        this.$refs.input.focus();
        
    },
    computed:{
        // show:{
        //     get(){
        //         return this.text.trim()!='';
        //     },
        //     set(val){
        //         this.text = val;
        //     }
        // }
    },
    methods:{
        back(){
            this.$router.back();
        },
        // 发送请求
        search(){
            // 改变点击时样式
            this.active = true;
            // 判断当前是中文还是英文
            if(this.text.trim()==''){
                return 

            }
            if(/^[\u4e00-\u9fa5]+$/.test(this.text)){
                this.le = 'cn';
            }else if(/^[a-zA-Z]+$/.test(this.text)){
                this.le = 'eng'
            }else{
                this.le = 'eng'

            }
            
            this.axios('/search/?doctype=json&le='+this.le+'&q=' + this.text)
            .then(res => {
                // res.send(res);
                this.text = ''
                this.wordsArr = res.data.data
                
            }).then(()=>{
               this.show = true;
               this.active = false;
            })

        },
        // 发送语言请求
        playWord(){
            // this.$emit('play')
        }
    }
}
</script>
<style lang="scss" scoped>
    .search{
        width: 100vw;
        height: 100vh;
        position: relative;
        padding-top: 70px;
        background-color: #eee;
        
        .search-header{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            display: flex;
            align-items: center;
            background-color: #eee;
            .back{
                width: 60px;
            }
            .text{
                flex: 1;
                height: 30px;
                border: none;
                border-radius: 8px;
                text-indent: 16px;

            }
            .submit{
                width: 60px;
                height: 30px;
                text-align: center;
                color: #323232;
                &.active{
                    color: #fff;
                }
            }

        }
        .search-content{
            height: 400px;
            width: 100%;
            // background-color: #ccc;
            .content-list{
                    padding: 10px;

                .content-item{
                    // background-color: #ccc;
                    // border-bottom: 1px solid #fff;

                    .same{
                        background-color: #fff;
                        width: 100%;
                        min-height: 70px;
                        margin-bottom: 10px;
                        .play{
                            padding: 10px;
                            // background-color: #eee;
                            border-bottom: 1px solid #ccc;
                            display: flex;
                            justify-content: space-between;
                            .icon{
                                // flex: 1;
                                width:50px;
                                padding-left: 20px;
                                height: 30px;
                                text-align: right;
                                border-left: 1px solid #ccc;
                            }
                        }
                        .word-explain{
                            min-height: 60px;
                            padding: 5px;
                            font-size: 16px;
                            color: #323232;
                            // background-color: #323232;
                        }
                    }
                    .different{

                        background-color: #fff;
                        min-height: 25px;
                        // max-height: 36px;
                        overflow: hidden;
                        border-bottom: 1px solid #eee;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        
                        // line-height: 36px;
                        font-size: 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        flex-wrap: wrap;
                        .diff-left,.diff-right{
                            flex: 1;
                            // font-size: 12px;
                            // line-height: 16px;
                            text-align: right;
                        }
                        .diff-left{
                            flex: 1;
                            max-width: 100px;
                            padding-left: 10px;
                            text-align: left;
                        }
                    }
                }

            }
        }
    }
</style>