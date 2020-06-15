<template>
    <div class="owner">
        <div class="header">
            <div class="mine-pic">
                <img src="../header_img/1.jpg" alt="">
            </div>
            <div class="mine-profile">
                <span class="mine-name">郭瑞南</span>
                <span class="study-process">已坚持1天</span>
            </div>
            <div class="btn-wrap">
                <span>修改</span>
            </div>
        </div>

        <!-- 列表项 -->
        <div class="list-wrapper">
            <ul class="wrapper-one">

                <!-- <li class="list-item">
                    <router-link to="/message" class="item-router" tag='div'>
                        <span class="icon setting_message"></span>
                        <span class="title">信息中心</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li> -->
                <li class="list-item">
                    <router-link to="/changebook" class="item-router" tag='div'>
                        <span class="icon settings_books"></span>
                        <span class="title">选择背词内容</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li>
                <!-- <li class="list-item">
                    <router-link to="/set" class="item-router" tag='div'>
                        <span class="icon settings_test"></span>
                        <span class="title">词汇量测试</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li> -->
                <!-- <li class="list-item">
                    <router-link to="/set" class="item-router" tag='div'>
                        <span class="icon settings_calendar"></span>
                        <span class="title">我的记忆日记</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li> -->
            </ul>

            <ul class="wrapper-two">
                <li class="list-item">
                    <router-link to="/set" class="item-router" tag='div'>
                        <span class="icon settings_basic"></span>
                        <span class="title">基本设置</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li>
                <!-- <li class="list-item">
                    <router-link to="/set" class="item-router" tag='div'>
                        <span class="icon settings_satisfaction"></span>
                        <span class="title">满意度调查</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li> -->
                <!-- <li class="list-item">
                    <router-link to="/set" class="item-router" tag='div'>
                        <span class="icon settings_survey"></span>
                        <span class="title">常见问题</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li> -->
                <!-- <li class="list-item">
                    <router-link to="/set" class="item-router" tag='div'>
                        <span class="icon settings_about"></span>
                        <span class="title">意见反馈</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li> -->
                <!-- <li class="list-item">
                    <router-link to="/set" class="item-router" tag='div'>
                        <span class="icon settings_survey"></span>
                        <span class="title">关于</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li>
                <li class="list-item">
                    <router-link to="/set" class="item-router" tag='div'>
                        <span class="icon settings_help"></span>
                        <span class="title">致谢</span>
                        <span class="icon-right"></span>
                    </router-link>
                </li> -->

                
                
            </ul>
        </div>

        <div class="footer">
            <Footer />
        </div>

    </div>
</template>
<script>
import Footer from '../components/Footer'
export default {
    components:{
        Footer
    },
    methods:{
        show(e){
            console.log(e)
        }
    }
}
</script>
<style lang="scss">
    .owner{
        width: 100vw;
        // height: 100vh;
        background-color: #f5f7f9;
        padding-bottom: 50px;
        // overflow: hidden;
        .header{
            height: 120px;
            width: 100vw;
            padding: 10px;
            margin-bottom: 20px;
            display: flex;
            overflow: hidden;
            align-items: center;
            background-color: #fa0;
            color: #fff;
            .mine-pic{
                width: 80px;
                height: 80px;
                border-radius: 50%;
                overflow: hidden;
                // padding: 10px;
                // background-color: red;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .mine-profile{
                flex: 1;
                // width:200px;
                height: 80px;
                padding: 10px;
                // background-color: #f1f1f1;
                display: flex;
                flex-direction: column;
                
                .mine-name{
                    
                    font-size: 22px;

                }
                .study-process{
                    font-size: 14px;
                }

            }
            .btn-wrap{
                width: 60px;
                // flex: 1;
                height: 80px;
                line-height: 80px;
                text-align: center;
                // background-color: yellow;
                span{
                    // border: 0;
                    padding: 2px 8px;
                    font-size: 14px;
                    // color: #fff;
                    border: 1px solid #fff;
                }
            }
        }

        .list-wrapper{
            width: 100%;
            // height: ;
            

            .wrapper-one,.wrapper-two{
                background-color: #fff;
                margin-bottom: 10px;

                .list-item{
                    height: 50px;
                    line-height: 50px;
                    border-bottom: 1px solid #ccc;

                    .item-router{
                        width:100%;
                        height: 100%;
                        padding: 10px 20px;
                        display: flex;
                        align-items: center;
                        .icon{
                            width: 30px;
                            height: 30px;
                            // background-color: #ccc;
                            background-repeat: no-repeat;
                            background-size: 100%;
                            &.setting_message{
                                background-image: url('../img/ic_setting_message.png');
                                
                            }
                            &.settings_calendar{
                                background-image: url('../img/ic_settings_calendar.png');
                            }
                            &.settings_satisfaction{
                                background-image: url('../img/ic_settings_satisfaction.png');
                            }
                            &.settings_basic{
                                background-image: url('../img/ic_settings_basic.png');
                            }
                            &.settings_thanks{
                                background-image: url('../img/ic_settings_thanks.png');
                            }
                            &.settings_help{
                                background-image: url('../img/ic_setting_help.png');
                            }
                            &.settings_books{
                                background-image: url('../img/ic_settings_books.png');
                            }
                            &.settings_about{
                                background-image: url('../img/ic_settings_about.png');
                            }
                            &.settings_survey{
                                background-image: url('../img/ic_settings_survey.png');
                            }
                            &.settings_about{
                                background-image: url('../img/ic_settings_about.png');
                            }
                            &.settings_test{
                                background-image: url('../img/ic_settings_test.png');
                                opacity: 0.7;
                            }

                        }
                        .title{
                            flex: 1;
                            height: 30px;
                            line-height: 30px;
                            padding-left: 20px;
                            font-size: 18px;
                            color: #323232;
                            // background-color: #eee;
                        }
                        .icon-right{
                            width: 30px;
                            height: 30px;
                            // background-color: #ccc;
                            background-image: url('../img/ic_arrow_right_gray_small.png');
                            background-repeat: no-repeat;
                            background-size: 100%;

                        }
                    }
                }

            }
        }

        .footer{
            position: fixed;
            bottom: 0;
            left: 0;

            // opacity: 0.8;
        }
    }
</style>