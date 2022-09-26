<template>
  <h1>welcome page</h1>
  <Step v-model:current="current" layout="horizontal">
    <StepItem title="已完成的步骤" content="已完成"></StepItem>
    <StepItem title="未完成的步骤" content="未完成1"></StepItem>
    <StepItem title="未完成的步骤" content="未完成2"></StepItem>
    <StepItem title="未完成的步骤" content="未完成3"></StepItem>
    <StepItem title="未完成的步骤" content="未完成4"></StepItem>
    <StepItem title="未完成的步骤" content="未完成5"></StepItem>
  </Step>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const current = ref(1);
</script>
<style scoped></style>
