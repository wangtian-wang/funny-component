<template>
  <ConfigProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </ConfigProvider>
</template>
<script setup lang="ts">
  import { watchEffect } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  watchEffect(() => {
    if (route.meta?.title) {
      document.title = route.meta.title as string;
    }
  });
</script>
<style>
  h1 {
    color: #999;
  }
</style>
