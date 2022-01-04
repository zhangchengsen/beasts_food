<template>

    <Top></Top>
    <Header></Header>
    <!-- 顶部 -->

    <!-- 头部 -->
    <div class="main" >
        <!-- 二级路由 -->
        <router-view />
    </div>

    <Footer></Footer>
    <!-- 底部 -->
</template>
<script setup>
    import Top from '@/components/layout/header.vue'
    import Header from '@/components/layout/next_header.vue'
    import Footer from '@/components/layout/footer.vue'
</script>