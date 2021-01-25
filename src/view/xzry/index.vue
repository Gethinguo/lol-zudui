<template>
    <div>
        <div class="title">参赛人员</div>
        <div class="list">
            <div class="cell" :class="ifHas(i)?'cellS':''" v-for="(v,i) in list" :key="v.name" @click="add_one(i)">
                <div>
                    <p>{{v.name}}</p>
                    <p>{{v.power}}</p>
                    <p>{{v.weizhi}}</p>
                </div>
            </div>
        </div>
        <div class="next" @click="next">
            下一步
        </div>
    </div>
</template>

<script>
    import {$getJson} from "../../libs/util";

    export default {
        name: "index",
        data() {
            return {
                list: [],
                selected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        },
        mounted() {
            this.getPersons()
        },
        methods: {
            async getPersons() {
                const re = await $getJson('./json/persons.json')
                console.log('人')
                console.log(re.data)
                this.list = re.data
            },
            add_one(index) {
                if (this.ifHas(index)) {
                    this.selected.splice(this.selected.indexOf(index), 1)
                } else {
                    this.selected.push(index)
                }
                console.log('结果')
                console.log(this.selected)

            },
            ifHas(index) {
                if (this.selected.indexOf(index) > -1) {
                    return true
                } else {
                    return false
                }
            },
            next() {
                if (this.selected.length === 10) {
                    let re = []
                    this.selected.forEach(i=>{
                        re.push(this.list[i])
                    })
                    console.log('结果')
                    console.log(re)
                    localStorage.setItem('lolPersons',JSON.stringify(re))
                    this.$router.push({name:'zd'})
                }else{
                    alert('只能选10人参赛')
                }

            }
        }
    }
</script>

<style scoped lang="less">
    .title {
        font-size: 20px;
        margin: 0 0 20px 0;
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        .cell {
            display: flex;
            border: 1px solid #eeeeee;
            margin: 0 20px 20px 0;
            padding: 10px;
            min-width: 250px;
        }

        .cellS {
            background: #45C6F1;
        }
    }

    .next {
        display: inline-block;
        border: 1px solid red;
        margin: 20px 0 0 0;
        padding: 20px;
        font-size: 20px;
    }
</style>