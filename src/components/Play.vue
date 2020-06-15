<template>
    <div class="play-wrap"   @click="play">
        <div class="play-icon">
            <audio :src="audio_src" ref="audio"></audio>
        </div>
    </div>
</template>
<script>
export default {
    props:["word","le"],
    data(){
        return {
            audio_src:''
        }
    },
    methods:{
        play(){

            if(this.le == 'cn'){
                //中文发音
                this.audio_src = 'http://dict.youdao.com/dictvoice?le='+this.le+'&audio='+this.word;
            }else{
                this.audio_src = 'http://dict.youdao.com/dictvoice?audio='+this.word;
            }
            
            setTimeout(() => {
            this.$refs.audio.play()
            });
            

        }
    }
}
</script>
<style lang="scss" scoped>
    .play-wrap{
        height: 100%;
        width: 100%;
        .play-icon{
            
            // width: 100%;
            width: 100%;
            height: 100%;
            background-image: url('../img/biz_course_daily_paper_icon_audio_first.png');
            background-repeat: no-repeat;

            background-size: 100%;
            background-position: center;
            background-origin: border-box;
            // background-color:red;
        }
    }
</style>