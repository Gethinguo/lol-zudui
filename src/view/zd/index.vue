<template>
    <div class="main">
        <div class="caozuo">
            <div class="btn" @click="reset_all">重新组队</div>
            <div class="btn" @click="next_zuhe">下个可能性</div>
        </div>
        <div class="content">
            <div class="left">
                <div class="list">
                    <div class="cell" v-for="(v,i) in left" :key="v.weizhi" draggable="true"
                         @dragstart="ondragstart($event,v,i,'left')"
                         @dragend="ondragend" @dragover.stop="ondragover" @drop="ondrop($event,v,i,'left')">
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
                <div class="cell" v-for="(v,i) in right" :key="v.weizhi" draggable="true"
                     @dragstart="ondragstart($event,v,i,'right')"
                     @dragend="ondragend" @dragover.stop="ondragover" @drop="ondrop($event,v,i,'right')">
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
        <div class="caozuo">
            <div class="btn">确认结果</div>
        </div>

    </div>
</template>

<script>
    import {zudui_suanfa,_power_sum} from '@/libs/zudui'

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
                wzPor1: 0,
                wzPor2: 0,

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
                ],

                // 拖动参数
                dragObj: {},
                dragtype: 'left',
                dragIndex: 0,

                dragDown: {},
                dragDowntype: 'right',
                dragDownIndex: 0,
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
            },
            ondragstart(e, v, index, type) {
                console.log('开始拖动')
                console.log(v)

                this.dragObj = v.person
                this.dragtype = type
                this.dragIndex = index
            },
            ondragend(e) {
                // console.log('结束拖动')
            },
            ondrop(e, v, index, type) {
                console.log('拖动放下')
                console.log(v)
                this.dragDown = v.person
                this.dragDowntype = type
                this.dragDownIndex = index
                // 下面 调整顺序，并重新计算战力和锲合度
                this.getNewTeam()
            },
            ondragenter(e) {
                // console.log('拖动进入')
            },
            ondragover(e) {
                // console.log('拖动进入')
                e.preventDefault()
            },
            getNewTeam() {
                if (this.dragtype === 'left') {
                    if (this.dragDowntype === 'left') {
                        this.left[this.dragIndex].person = this.dragDown
                        this.left[this.dragDownIndex].person = this.dragObj
                    }
                    if (this.dragDowntype === 'right') {
                        this.right[this.dragDownIndex].person = this.dragObj
                        this.left[this.dragIndex].person = this.dragDown
                    }
                }
                if (this.dragtype === 'right') {
                    if (this.dragDowntype === 'left') {
                        this.left[this.dragDownIndex].person = this.dragObj
                        this.right[this.dragIndex].person = this.dragDown
                    }
                    if (this.dragDowntype === 'right') {
                        this.right[this.dragDownIndex].person = this.dragObj
                        this.right[this.dragIndex].person = this.dragDown
                    }
                }
                let arr1 = this.left.map((p) => Number(p.person.power))
                let arr2 = this.right.map((p) => Number(p.person.power))
                this.power1 = _power_sum(arr1)
                this.power2 = _power_sum(arr2)
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

                p {
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
        cursor: pointer;
        padding: 5px 8px;
        margin: 0 10px 10px 0;
        border: 1px solid #eeeeee;
    }
</style>