<template>
    <mainPage></mainPage>
</template>

<script>
    import {zoom} from '@/libs/util'
    import mainPage from '@/components/main'
    export default {
        name: 'App',
        data() {
            return {}
        },
        components:{mainPage},
        mounted() {
            zoom()
            window.addEventListener('resize', () => {
                zoom()
            })
        },
    }
</script>
