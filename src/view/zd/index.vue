<template>
    <div class="main">
        <div class="caozuo">
            <div class="btn" @click="reset_all">重新组队</div>
            <div class="btn" @click="next_zuhe">下个可能性</div>
        </div>
        <div class="content">
            <div class="left">
                <div class="list">
                    <div class="cell" v-for="(v,i) in left" :key="v.weizhi">
                        <div>
                            <p>{{v.person.name}}</p>
                            <p>{{v.person.power}}</p>
                            <div>
                            <span class="weizhi-cell" v-for="w in v.person.weizhi" :key="w"
                                  :style="{color:w===v.weizhi?'red':''}">{{w}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="jieguo">
                    <p>战力：{{power1}}</p>
                    <p>位置锲合度：{{wzPor1}}</p>
                </div>
            </div>
            <div class="right">
                <div class="cell" v-for="(v,i) in right" :key="v.weizhi">
                    <div>
                        <p>{{v.person.name}}</p>
                        <p>{{v.person.power}}</p>
                        <div>
                            <span class="weizhi-cell" v-for="w in v.person.weizhi" :key="w"
                                  :style="{color:w===v.weizhi?'red':''}">{{w}}</span>
                        </div>
                    </div>
                </div>
                <div class="jieguo">
                    <p>战力：{{power2}}</p>
                    <p>位置锲合度：{{wzPor2}}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {zudui_suanfa} from '@/libs/zudui'

    export default {
        name: "index",
        data() {
            return {
                lolPersons: [],
                lolPersonsObj: {},

                // 实力数值
                power1: 0,
                power2: 0,
                // 位置锲合度
                wzPor1:0,
                wzPor2:0,

                allzuhe: [], // 所有的组合方式
                allzuheIndex: 0, // 所有的组合方式
                left: [
                    {weizhi: '上', person: {}},
                    {weizhi: '野', person: {}},
                    {weizhi: '中', person: {}},
                    {weizhi: 'AD', person: {}},
                    {weizhi: '辅', person: {}},
                ],
                right: [
                    {weizhi: '上', person: {}},
                    {weizhi: '野', person: {}},
                    {weizhi: '中', person: {}},
                    {weizhi: 'AD', person: {}},
                    {weizhi: '辅', person: {}},
                ]
            }
        },
        mounted() {
            this.lolPersons = JSON.parse(localStorage.getItem('lolPersons'))
            this.lolPersons.forEach(v => {
                this.lolPersonsObj[v.name] = v
            })

            this.reset_all()

        },
        methods: {
            zudui() {
                this.allzuhe = zudui_suanfa(this.lolPersons)
                console.log('结果')
                console.log(this.allzuhe)
                this.getRes()
            },
            getRes() {
                const zuhe = this.allzuhe[this.allzuheIndex]
                this.power1 = zuhe.po1
                this.power2 = zuhe.po2
                this.wzPor1 = zuhe.wzPor1
                this.wzPor2 = zuhe.wzPor2
                zuhe.persons.forEach((v1, i1) => {
                    if (i1 < 5) {
                        this.left.forEach((v2, i2) => {
                            if (i2 === i1) {
                                this.left[i2].person = this.lolPersonsObj[v1]
                            }
                        })
                    } else {
                        this.right.forEach((v3, i3) => {
                            if ((i3 + 5) === i1) {
                                this.right[i3].person = this.lolPersonsObj[v1]
                            }
                        })
                    }
                })
                console.log('结果')
                // console.log(this.allzuhe)
                console.log(this.left)
                console.log(this.right)
            },
            randomSort(arr) {
                // this.lolPersons.sort(function () {
                //     return 0.5 - Math.random()
                // })
                let i = arr.length
                while (i) {
                    let j = Math.floor(Math.random() * i--);
                    [arr[j], arr[i]] = [arr[i], arr[j]]
                }
            },
            reset_all() {
                // 打乱顺序
                this.randomSort(this.lolPersons)
                if (!this.lolPersons) {
                    alert('先选择参赛人员')
                }
                this.zudui()
            },
            next_zuhe() {
                this.allzuheIndex++
                this.getRes()
            }
        }
    }
</script>

<style scoped lang="less">
    .main {
        .caozuo {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content {
            display: flex;

            .left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 50%;
            }

            .right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 50%;
            }

            .jieguo {
                font-size: 25px;
                color: aquamarine;
                p{
                    margin: 0 0 20px 0;
                }
            }
        }


        .cell {
            width: 180px;

            margin: 0 0 20px 0;
            padding: 5px 10px;
            border: 1px solid #eeeeee;

            .weizhi-cell {
                display: inline-block;
                padding: 0 10px 0 0;
            }
        }
    }

    .btn {
        display: inline-block;
        padding: 5px 8px;
        margin: 0 10px 10px 0;
        border: 1px solid #eeeeee;
    }
</style>