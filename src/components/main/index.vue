<template>
    <div class="main-box">
        <div class="top bg-100">
            <div class="router bg-100">
                <div class="text" :class="$route?.name?.match(v.name)?'text-selected':''" v-for="v in list"
                     :key="v.name" @click="toNext(v.name)">{{v.text}}
                </div>
            </div>
            <div class="date-and-time">
                <div class="date">
                    <img src="./imgs/date-icon.png" class="icon" alt="">
                    <p>{{date}}</p>
                </div>
                <div class="time">
                    <img src="./imgs/time-icon.png" class="icon" alt="">
                    <p>{{time}}</p>
                </div>
            </div>
        </div>
        <router-view/>

    </div>
</template>

<script>
    import moment from "moment"
    import {timer} from 'rxjs'

    export default {
        name: "index",
        data() {
            return {
                date: null,
                time: null,
                list: [
                    {text: '选择人员', name: 'xzry',},
                    {text: '组队', name: 'zd',},
                    {text: '结果', name: 'jg',},
                ]
            }
        },
        mounted() {
            timer(0, 1000).subscribe(v => {
                this.date = moment().format('YYYY-MM-DD')
                this.time = moment().format('HH:mm:ss')
            })
        },
        methods: {
            toNext(name) {
                this.$router.push({name})
            }
        }
    }
</script>

<style scoped lang="less">
    .main-box {
        position: relative;
        padding: 28px 30px;

        .top {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            height: 89px;
            margin: 0 0 26px 0;

            background-image: url("./imgs/title.png");

            .router {
                margin: 36px 70px 0 0;
                width: 647px;
                height: 36px;
                background-image: url("./imgs/router-bg.png");

                display: flex;
                justify-content: space-between;

                padding: 0 38px;

                .text {
                    font-size: 20px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(199, 255, 255, .4);
                    cursor: pointer;
                }

                .text-selected {
                    color: #C7FFFF;
                    border-bottom: 1px solid #C7FFFF;
                }
            }

            .date-and-time {
                color: #C7FFFF;
                display: flex;

                .date, .time {
                    display: flex;
                    align-items: center;
                }

                .icon {
                    margin: 0 19px 0 30px;
                    width: 24px;
                    height: 24px;
                }

                p {
                    font-size: 24px;
                    font-family: DIN-Medium;
                    line-height: 133px;
                    color: #C7FFFF;
                }
            }
        }
    }

</style>