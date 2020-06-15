<template>
  <div class="main">
      <router-view/>
  </div>
</template>
<script>
export default {
  components:{
  },
  data(){
    return {
      // type:0 //美音 1 英音
    }
  }
  
}

</script>

<style lang="scss" scoped>
  .main{
    width: 100vw;
  }
</style>
