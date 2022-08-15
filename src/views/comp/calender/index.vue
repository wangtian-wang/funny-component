<template>
  <div>
    calender
    <Calender></Calender>
    <TimeDown :total-time="totalTime"></TimeDown>
    <Test></Test>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import Test from '@/components/basic/test.vue';
  import Calender from '../../../components/basic/calendar.vue';
  import TimeDown from '@/components/basic/timeDown.vue';
  const totalTime = '2022/07/15 13:00:00';
</script>
