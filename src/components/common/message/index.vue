<template>
  <transition name="message-wrapper-fade">
    <div v-if="visiable" class="message-wrapper" :style="{ top: top + 'px' }">
      <p :class="typeClass">{{ content }}</p>
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { computed, reactive, toRefs } from 'vue';
  import { fields } from './index';
  let timer;
  const props = defineProps({
    content: {
      type: String,
      default: 'this is a message component',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    field: {
      type: String,
      default: 'info',
      validator(val: string) {
        return fields.includes(val);
      },
    },
  });

  const state = reactive({
    visiable: false,
    top: 20,
  });
  const typeClass = computed(() => {
    return props.field;
  });
  const setVisiable = (value) => {
    return new Promise((resolve) => {
      state.visiable = value;
      timer = setTimeout(() => {
        resolve('');
        clearTimeout(timer);
        timer = null;
      }, 300);
    });
  };
  const { visiable, top } = toRefs(state);
  const setTop = (top) => {
    state.top = top;
    return top;
  };
  defineExpose({
    height: 40,
    margin: 20,
    setVisiable,
    setTop,
  });
</script>
<style lang="less" scoped>
  .message-wrapper {
    position: fixed;
    left: 50%;
    z-index: 999;
    width: 380px;
    height: 40px;
    margin-left: -190px;
    text-align: center;
    font-size: 16px;
    border-radius: 4px;
    transition: top 0.3s ease-out;
    border: 1px solid #ededed;
  }
  .message-wrapper-fade-enter-active {
    transition: all 0.3s ease-in;
  }
  .message-wrapper-fade-leave-active {
    transition: all 0.3s ease-out;
  }
  .message-wrapper-fade-enter-from,
  .message-wrapper-fade-leave-from {
    transform: translateY(-20px);
    opacity: 0;
  }
  p {
    margin: 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  p.success {
    color: #67c23a;
  }
  p.info {
    color: #909399;
  }
  p.fail {
    color: #f56c6c;
  }
  p.warning {
    color: #e6a23c;
  }
</style>
