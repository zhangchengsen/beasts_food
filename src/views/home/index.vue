<template>
    <div class="container" style="height:100px;width:100px;background-color:pink;"></div>
    
</template>

<script setup>
    import {onMounted} from 'vue'
    // import {baseURL} from '@/utils/request'
    import request from '@/utils/request'
    // onMounted(() => {
    //     // console.log(baseURL)
    //     console.log(request)
    //     request('/member/profile','get',{a : 10})
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => {
    //             console.log('发生错误',err)
    //         })
    //     })
       
        
</script>
<style lang="less" scoped>
    @import '../../assets/styles/mixins.less';
    .container {
        .hoverShadow();
        color: @nmColor;
    }
</style>