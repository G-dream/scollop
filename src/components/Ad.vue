<template>
    <div class="ad">
        <div class="back" @click="back">返回</div>
        <div>广告页没有广告</div>
    </div>
</template>
<script>
export default {
    methods: {
        back(){
            this.$router.back()
        }
    }
}
</script>
<style lang="scss">
    .ad{
        width: 100vw;
        
        .back{
            width: 100vw;
            height: 50px;
            background-color: #eee;
            line-height: 50px;
            padding-left: 20px;

        }
    }
</style>
