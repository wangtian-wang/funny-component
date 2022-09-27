<template>
  <div :class="baseClass">
    <div :class="innerClass" @click="stepClick">
      <template v-if="icon && typeof icon === 'string'">
        <IconFont :type="icon" margin-right="8"></IconFont>
      </template>
      <template v-else>
        <div :class="iconClass" v-html="renderIcon()"></div>
      </template>
      <div :class="contentClass">
        <div :class="titleClass">{{ props.title }}</div>
        <div :class="descripClass">{{ props.content }}</div>
        <div :class="extraClass">{{ props.extra }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, inject, ref, useAttrs } from 'vue';
  import prop from './props';

  const props = defineProps(prop);
  console.log(props.icon, ' attr in stem-item');
  // injected
  const stepState = inject('StepState', undefined);
  const stepProps = inject('StepProps', undefined);

  // boolean props
  const canClick = computed(() => props.status !== 'process' && !stepProps?.readonly);

  // class
  const COMPONENT_NAME = ref('step-item');
  const statusClass = computed(() => ({
    [`${COMPONENT_NAME.value}--${props.status}`]: props.status,
  }));
  const baseClass = computed(() => [`${COMPONENT_NAME.value}`, statusClass.value]);
  const innerClass = computed(() => {
    return [
      `${COMPONENT_NAME.value}__inner`,
      canClick.value ? `${COMPONENT_NAME.value}--clickable` : '',
    ];
  });
  const iconClass = computed(() => [`${COMPONENT_NAME.value}__icon`, statusClass.value]);
  const contentClass = computed(() => `${COMPONENT_NAME.value}__content`);
  const titleClass = computed(() => `${COMPONENT_NAME.value}__title`);
  const descripClass = computed(() => `${COMPONENT_NAME.value}__description`);
  const extraClass = computed(() => `${COMPONENT_NAME.value}__extra`);
  // event 点击下一步,切换进度
  // 每次点击的时候完成两件事  1: 更改step的current 2: 重新计算当前每一步的状态
  const stepClick = (e: MouseEvent) => {
    if (!canClick.value) return;
    const val = !props.value ? props.index : props.value;
    stepState.setCurrent(val, stepState.current, { e });
  };
  // components

  const renderIcon = () => {
    let defaultIcon;
    // stepsProps.theme === 'default'
    if (props.status) {
      let icon = '';
      switch (props.status) {
        case 'finish':
          icon = '✓';
          break;
        case 'error':
          icon = 'x';
          break;
        default:
          icon = String(props.index + 1);
          break;
      }
      defaultIcon = `<span class="step-item__icon--number">${icon}</span>`;
    }

    return defaultIcon;
  };
</script>
<script lang="ts">
  export default {
    name: 'StepItem',
    inheritAttrs: false,
  };
</script>
