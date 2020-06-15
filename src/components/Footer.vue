<template>
    <!-- 底部固定 -->
    <div class="footer">
        <div class="fixed-bottom" >
        <router-link to="/" class="nav" tag="div"  >首页</router-link>
        <router-link to='/mine' class="nav"   tag="div">我的</router-link>
        </div>
    </div>
    
</template>
<script>
export default {
    // props:["colorIndex"],
    data(){
        return {
            active: false,
            colorIndex: true
        }
    },
    methods: {
        changeColor() {
            this.$emit('change-color')
            this.colorIndex = !this.colorIndex;
        }
    }
}
</script>

<style lang="scss">
    .footer{
        position: relative;
        width: 100vw;
        height: 50px;
    }
    .fixed-bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        width:100vw;
        height: 50px;
        background-color: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        text-align: center;
        .nav{
            flex: 1;
            text-decoration: none;
            font-size: 20px;
            color: #323232;
            
            &.router-link-exact-active{
                color: #fff;
            }
        }
        
    }
</style>