<template>
    <div class="set">
        <div class="set-header">
            <div class="back" @click="$router.back()">👈</div>
            <div class="header-title">基本设置</div>
        </div>
        <div class="wraper">
            <div class="wrap">
                <div class="phonetic-title title">发音</div>

                <div class="phonetic item">
                    <div class="phonetic-item item-title">发音选项</div>
                    <div>
                        <label for="us">
                        美音<input type="radio" id="us"  name="phonetic" value="0" @click="setPhonetic($event,0)" :checked="type==0">
                        </label>
                        <label for="uk">
                            英音<input type="radio" id="uk" value="1" name="phonetic" @click="setPhonetic($event,1)" :checked="type==1">
                        </label>
                    </div>
                </div>
            </div>
            <!-- 其他 -->
            <div class="wrap">
                <div class="title">其他</div>

                <div class="other item">
                    <div class="other-item item-title">每组单词量</div>
                    
                    <select @change="select($event)" >
                        <option value="5"  :selected=" 5==total">5</option>
                        <option value="10" :selected="10==total">10</option>
                        <option value="15" :selected="15==total">15</option>
                        <option value="20" :selected="20==total">20</option>
                        <option value="30" :selected="30==total">30</option>
                        <option value="40" :selected="40==total">40</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row" v-for="i in 32" :key='i'>
            <div class="col" v-for="j in 32" :key='j' :style='{background:"rgb(255,"+ (i-1)*8+ ","+(j-1)*8+")"}'></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return { 
            colorList:{
                row:['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'],
                col:['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
            }
        }
    },
    computed:{
        type:{
            get(){
                return this.$store.state.type
            },
            set(val) {
                this.$store.state.type = val
            }
        },
        total(){
            return this.$store.state.total
        }
    },
    mounted(){
    },
    methods: {
        setPhonetic(e,type){
            this.type = type;
        },
        select(e){
            this.$store.state.total = Number(e.target.value)
        }

    }
}
</script>
<style lang="scss">
    .set{
        width: 100vw;
        background-color: #fff;
        height: 100vh;
        padding-top: 70px;
        .set-header{
            height: 70px;
            background-color: #ccc;
            width: 100vw;
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .back{
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                // background-color: #eee;
            }
            .header-title{
                flex: 1;
                text-align: center;
                padding-right: 40px;
            }
        }
        .wraper{
            width: 100vw;
            // padding: 0 10px;
            // min-height: 100vh;
            // background-color: #fff;
            .wrap{
            
            border-bottom: 1px solid #ff6;
            margin: 0;

            .title{
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                padding-right: 10px;
            }
            .item{
                // background-color: #CCC;
                padding-left: 10px;
                padding-right: 10px;
                display: flex;
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                color: #322332;
                justify-content: space-between;
                .item-title{

                }
                select{
                    border: 1px solid #ccc;
                    // background:none;
                    // option{
                    //     border:none;
                    // }
                }
            }
        }
        }
        

    }
    .row{
        height: 16px;
        width: 512px;
    }
    .col{
        width: 16px;
        height: 16px;
        float: left;
    }
</style>