<template>
    <div class="main">
        <div class="title">
            <p>对战结果  (发布时间：{{time}})</p>
        </div>
        <div class="content">
            <div class="left">
                <div class="list">
                    <div class="cell" v-for="(v,i) in left" :key="v.weizhi">
                        <div>
                            <p>{{v.person.name}}</p>
                            <!--                            <p>{{v.person.power}}</p>-->
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
                        <!--                        <p>{{v.person.power}}</p>-->
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
    import {_power_sum} from '@/libs/zudui'

    export default {
        name: "index",
        data() {
            return {
                time:null,
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
                ],
                positionsObj: {0: '上', 1: '野', 2: '中', 3: 'AD', 4: '辅'},
                // 实力数值
                power1: 0,
                power2: 0,
                // 位置锲合度
                wzPor1: 0,
                wzPor2: 0,
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            async getData() {
                const re = await this.$fetch.get('getZuHe')
                if (re && re.zudui) {
                    this.left = re.zudui.left
                    this.right = re.zudui.right
                    this.time = re.time
                    this.getNewPower()
                } else {
                    alert('还没组队，请组队者编排！')
                }

            },
            /**
             * 重新计算战斗力
             */
            getNewPower() {
                let arr1 = this.left.map((p) => Number(p.person.power))
                let arr2 = this.right.map((p) => Number(p.person.power))
                this.power1 = _power_sum(arr1)
                this.power2 = _power_sum(arr2)

                const wzPor1 = this.left.map((p, pi) => {
                    let wz = this.positionsObj[pi]
                    let wzValue = p.person.weizhi.indexOf(wz)
                    if (wzValue > -1) {
                        return (-wzValue + 5) * 200
                    } else {
                        return 0
                    }
                })
                const wzPor2 = this.right.map((p, pi) => {
                    let wz = this.positionsObj[pi]
                    let wzValue = p.person.weizhi.indexOf(wz)
                    if (wzValue > -1) {
                        return (-wzValue + 5) * 200
                    } else {
                        return 0
                    }
                })

                this.wzPor1 = _power_sum(wzPor1)
                this.wzPor2 = _power_sum(wzPor2)
            },
        }
    }
</script>

<style scoped lang="less">
    .title {
        p {
            font-size: 30px;
            font-weight: bold;
            margin: 50px 0;
            text-align: center;
        }
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

            p {
                margin: 0 0 20px 0;
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
</style>