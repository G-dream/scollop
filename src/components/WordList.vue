<template>
    <div>
        <ul class="content">
                <li
                v-for="(word) in words"
                :key="word"
                 class="content-item">
                    <div class="item-word">
                        <p>{{word}}</p>
                        <!-- <p>v.提供补贴</p> -->
                    </div>
                    <div class="like">⭐</div>
                    <div class="play" :data-word="word" @click="play($event)">▶</div>
                </li>
            </ul>
    </div>
</template>
<script>
export default {
    props:[
        "words"
    ],
    computed: {
        type(){
            return this.$store.state.type
        }
    },
    methods:{
        play(e){
            let word = e.target.dataset.word;
            if(this.audio){
                this.audio.pause();
                this.audio = null;
            }
            //播放
            this.audio = new Audio();
            this.audio.src = "http://dict.youdao.com/dictvoice?type="+ this.type+"&audio="+ word;
            this.audio.oncanplay = ()=>{
                this.audio.play()
            }
        }
    }
}
</script>