<template>
    <div class="box">
        <div class="left">
            <p class="p1">{{text}}</p>
            <p class="p2">{{text2}}</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: "titleC",
    props: {
      text: {
        type: String,
        default() {
          return '标题'
        }
      },
      text2: {
        type: String,
        default() {
          return ''
        }
      },
    },
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="less">
    .box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-bottom: 22px;
        border-bottom: 1px solid #164C6A;
        .left {
            display: flex;
            align-items: center;
            .img1 {
                width: 6px;
                height: 26px;
                margin-right: 20px;
            }
            .p1 {
                font-size: 30px;
                font-family: TRENDS;
                line-height: 36px;
                color: #C7FFFF;
                margin-right: 20px;
            }
            .p2 {
                font-size: 20px;
                font-family: TRENDS;
                line-height: 24px;
                color: #24688A;
                align-self: flex-end;
            }
        }

        .img2 {
            width: 34px;
            height: 12px;
        }
    }
</style>