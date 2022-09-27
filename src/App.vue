<template>
  <!-- <button @click="plus(1)"> plus</button>
  <button @click="plusAdd(10)"> plus add </button> -->
  <!-- {{ store.state.count }} -->
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
  import { useMyStore } from './my-store/index';
  const route = useRoute();
  watchEffect(() => {
    if (route.meta?.title) {
      document.title = route.meta.title as string;
    }
  });
  const store = useMyStore();

  const plus = (num) => {
    store.commit('plus', num);
  };
  const plusAdd = (num) => {
    store.dispatch('plus2', num);
  };
</script>
<style>
  h1 {
    color: #999;
  }
  .step-item svg {
    width: 30px;
    height: 30px;
  }
</style>
