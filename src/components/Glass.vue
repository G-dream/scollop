<template>
    <div class="search-btn">
        <!-- <input type="text" class="text"> -->
        
        <router-link class="icon" to="/search" tag="span">🔍</router-link>
    </div>
</template>
<style lang="scss" scoped>
    .search-btn{
        width: 100%;
        height: 100%;
        // background: red;
        border-radius: 50%;
        overflow: hidden;
        position: relative;

        .text{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
            
            z-index: 2;
        }
        .icon{
            width: 100%;
            height: 100%;
            text-align: center;
            // line-height: 100%;
            border-radius: 50%;
            // border: 1px solid #ccc;
            // background-color: #fff;
            position: absolute;
            
        }
    }
</style>