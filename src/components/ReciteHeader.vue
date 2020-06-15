<template>
    <div class="recite-header">
        <div class="back" @click="back">👈</div>
        <div class="title">
            <span class="piece">单词卡片</span>
            <div class="process">
                <div class="finished" :style='{ width : (count)/num * 100 + "%" }'>{{count}}</div>
                <div class="review" :style='{ width : (review)/num * 100 + "%" }'>{{review}}</div>
                <div class="unfinished" :style='{ width : (num - count - review) / num * 100 + "%" }'>{{num - count - review}}</div>
            </div>
        </div>
        <div class="search active">
            <Glass />
        </div>
        <router-link class="set-item" tag="div" to="/set">设置</router-link>
    </div>
</template>
<script>
import Glass from './Glass'
export default {
    props:["num","count","review"],
    components:{
        Glass
    },
    methods:{
        back(){
            this.$router.back()
        }
    }
}
</script>
<style lang="scss" scoped>
    .recite-header{
        height: 70px;
        width: 100vw;
        background-color: #f7f2f7;
        display: flex;
        align-items: center;
        justify-content: center;
        .back{
            width: 60px;
        }
        .title{
            flex: 1;
            display: flex;
            align-items: center;
            .piece{
                min-width: 90px;
                font-size: 18px;
                font-weight: 500;
                padding-right: 10px;
            }
            .process{
                flex: 1;
                height: 16px;
                font-size: 12px;
                line-height: 16px;
                background-color: #c4c43b;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                // position: relative;
                overflow: hidden;
                .finished{
                    float: left;
                    // padding-right: 8px;
                    // margin-right: 8px;

                    // position: absolute;
                    // top: 0;
                    // left: 0;
                    background-color: rgb(172, 131, 56);
                    max-width: 100%;
                    color: #fff;
                    text-align: center;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                    z-index: 100;
                }
                .review{
                    float: left;
                    // margin-left: -8px;
                    
                    // position: absolute;
                    // top: 0;
                    // left: 0;
                    background-color: rgb(206, 198, 183);
                    max-width: 100%;
                    color: #fff;
                    // text-align: center;
                    text-align: center;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                    overflow: hidden;

                }
                .unfinished{
                    float: left;
                    // position: absolute;
                    // top: 0;
                    // left: 0;
                    
                    text-align: center;
                    max-width: 100%;
                    color: #fff;
                    overflow: hidden;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
            }
        }
        .search{
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            &.active{
                background-color: #f1f1f1;
            }
        }
        .set-item{
            text-align: center;
            font-weight: bold;
            width: 60px;
        }
    }
</style>
