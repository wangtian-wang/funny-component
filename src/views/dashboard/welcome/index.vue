<template>
  <h1>welcome page</h1>
  <!-- 以下写法 渲染OK  -->
  <Step v-model:current="current" layout="vertical">
    <StepItem title="已完成的步骤" content="已完成" icon="icon-denglu"></StepItem>
    <StepItem title="未完成的步骤" content="未完成1"></StepItem>
    <StepItem title="未完成的步骤" content="未完成2" status="error"></StepItem>
    <StepItem title="未完成的步骤" content="未完成3"></StepItem>
  </Step>
  <!-- 以下写法 渲染OK -->
  <!-- <Step v-model:currentString="current" :options="steps"></Step> -->
  <!-- <IconFont type="icon-gouwuchekong"></IconFont> -->
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const current = ref(1);
  const currentString = ref('first');
  const steps = [
    { title: '已完成的步骤', value: 'first', content: '点击切换步骤' },
    { title: '进行中的步骤', value: 'second', content: '点击切换步骤' },
    { title: '进行中的步骤', value: 'third', content: '这是进行中的步骤' },
    { title: '已完成的步骤', value: 'forth', content: '点击切换步骤' },
  ];
</script>

<style scoped></style>
