<template>
    <div class="model" v-show="showModel">
        <div class="close" @click="close_it">X</div>
        <div class="content">
            <p class="title">几个人必须在一队</p>
            <div>
                <div class="cell">
                    <p style="width:100px">一队</p>
                    <div class="person" :class="ifHas(p,selected11)?'personS':''" v-for="p in lolPersons" :key="p.name"
                         @click="add_one(p,selected11,1)">{{p.name}}
                    </div>
                </div>
                <div class="cell">
                    <p style="width:100px">另一队</p>
                    <div class="person" :class="ifHas(p,selected12)?'personS':''" v-for="p in lolPersons2" :key="p.name"
                         @click="add_one(p,selected12)">{{p.name}}
                    </div>
                </div>

            </div>
            <p class="title">两个人对位</p>
            <div class="btn1" @click="addTj2">加一组</div>
            <div class="cell" v-for="(arr,arri) in selected2" :key="arri">
                <div class="person" :class="ifHas2(p,arri)?'personS':''" v-for="p in lolPersons" :key="p.name"
                     @click="add_one2(p,arri)">{{p.name}}
                </div>
                <div class="btn1" style="color: red" @click="delete_s2(arri)">删除</div>
            </div>
        </div>
        <div class="btn-box">
            <div class="btn" @click="confirm">确定</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                selected11: [],
                selected12: [],
                selected2: [],
            }
        },
        props: {
            showModel: {
                type: Boolean,
                default() {
                    return false
                },
            },
            lolPersons: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },
        computed: {
            lolPersons2() {
                let arr = this.lolPersons.filter(v => {
                    return this.selected11.indexOf(v.name) < 0
                })
                return arr
            }
        },
        mounted() {
        },
        methods: {
            add_one(p, selected,f) {
                if(f===1){
                    this.selected12 = []
                }
                if (selected.indexOf(p.name) > -1) {
                    selected.splice(selected.indexOf(p.name), 1)
                } else {
                    if (selected.length >= 5) {
                        alert('最多选5个')
                    } else {
                        selected.push(p.name)
                    }
                }
            },
            add_one2(p, arri) {
                if (this.selected2[arri].indexOf(p.name) > -1) {
                    this.selected2[arri].splice(this.selected2[arri].indexOf(p.name), 1)
                } else {
                    if (this.selected2[arri].length >= 2) {
                        alert('最多选2个')
                    } else {
                        this.selected2[arri].push(p.name)
                    }

                }
            },
            addTj2() {
                this.selected2.push([])
            },
            delete_s2(arri) {
                this.selected2.splice(arri, 1)
            },
            ifHas(p, selected) {
                if (selected.indexOf(p.name) > -1) {
                    return true
                } else {
                    return false
                }
            },
            ifHas2(p, arri) {
                if (this.selected2[arri].indexOf(p.name) > -1) {
                    return true
                } else {
                    return false
                }
            },
            confirm() {
                let fuhe = true
                if(this.selected2 && this.selected2.length){
                    this.selected2.forEach(v=>{
                        if(v.length !== 2){
                            fuhe = false
                        }
                    })
                }
                if(!fuhe){
                    alert('对位情况都必须是2人')
                    return
                }
                this.$emit('confirmTJ', {
                    selected11: this.selected11,
                    selected12: this.selected12,
                    selected2: this.selected2
                })
                this.$emit('update:showModel', false)
            },
            close_it() {
                this.$emit('update:showModel', false)
            }
        }
    }
</script>

<style scoped lang="less">
    .model {
        position: absolute;
        left: 100px;
        top: 10vh;

        width: 1720px;
        height: 800px;

        padding: 20px;
        background: rgba(0, 0, 0, .8);

        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 25px;
            color: white;

        }

        .content {
            .title {
                font-size: 20px;
                padding: 10px 0;
                color: white;
                font-weight: bold;
            }

            .cell {
                display: flex;
                align-items: center;
                padding: 20px 10px;
                background: rgba(255, 255, 255, .5);

                .person {
                    display: inline-block;
                    border: 1px solid #e3e3e3e3;
                    padding: 5px;
                    margin: 0 10px 0 0;
                }

                .personS {
                    background: aquamarine;
                }
            }
        }
    }

    .btn1 {
        display: inline-block;
        cursor: pointer;
        padding: 5px 8px;
        margin: 0 10px 10px 0;
        border: 1px solid #eeeeee;
    }

    .btn-box {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;

        .btn {
            display: inline-block;
            cursor: pointer;
            font-size: 40px;
            padding: 5px 8px;
            margin: 0 10px 10px 0;
            border: 1px solid #eeeeee;
        }
    }

</style>