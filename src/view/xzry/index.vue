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
        <div class="add_one">
            <input type="text" v-model="form.name" placeholder="请输入姓名">
            <input type="number" v-model="form.power" placeholder="请输入战力">
            <input type="text" v-model="form.weizhi" placeholder="请输入位置(用,隔开)">
            <div class="btn" @click="addOne">临时加一个</div>
        </div>
        <div>
            <p>已选择人数：{{selected.length}}</p>
        </div>
        <div class="next" @click="next">
            下一步
        </div>
    </div>
</template>

<script>
    import {$getJson} from "../../libs/util";

    function init_form() {
        return {
            name: '',
            power: null,
            weizhi: ''
        }
    }

    export default {
        name: "index",
        data() {
            return {
                list: [],
                selected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                form: init_form()
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
            addOne(){
                if(this.form.name && this.form.power&& this.form.weizhi){
                    let obj = JSON.parse(JSON.stringify(this.form))
                    if(this.form.weizhi.match(',')){
                        obj.weizhi = this.form.weizhi.split(',')
                    }
                    if(this.form.weizhi.match('，')){
                        obj.weizhi = this.form.weizhi.split('，')
                    }
                    this.list.push(obj)
                }else{
                    alert('都需要填')
                }

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
                    this.selected.forEach(i => {
                        re.push(this.list[i])
                    })
                    console.log('结果')
                    console.log(re)
                    localStorage.setItem('lolPersons', JSON.stringify(re))
                    this.$router.push({name: 'zd'})
                } else {
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
    .add_one{
        margin: 10px 0;
        padding: 15px;
        border: 2px solid #e3e3e3;
        input{
            height: 50px;
            margin: 0 20px 0 0;
        }
    }

    .next {
        display: inline-block;
        border: 1px solid red;
        margin: 20px 0 0 0;
        padding: 20px;
        font-size: 20px;
    }
    .btn {
        display: inline-block;
        cursor: pointer;
        padding: 5px 8px;
        margin: 0 10px 10px 0;
        border: 1px solid #eeeeee;
    }
</style>