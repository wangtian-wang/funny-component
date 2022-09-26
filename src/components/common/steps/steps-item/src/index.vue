<template>
  <div :class="baseClass">
    <div :class="innerClass" @click="stepClick">
      <div :class="iconClass" v-html="renderIcon()"></div>
      <div :class="contentClass">
        <div :class="titleClass">{{ props.title }}</div>
        <div :class="descripClass">{{ props.content }}</div>
        <div :class="extraClass">{{ props.extra }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { stepsProps } from 'ant-design-vue/lib/steps';
  import { computed, inject, ref, useAttrs } from 'vue';
  import prop from './props';

  const props = defineProps(prop);
  // console.log(useAttrs(), ' attr in stem-item');
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

/** 该组件还支持插槽 那插槽先放在下一个阶段吧*/
<style lang="scss" scoped>
  .step--horizontal {
    .step-item {
      flex: 1;
      overflow: hidden;
      vertical-align: top;
      margin-right: 8px;
      position: relative;
      display: flex;
      .step-item__inner {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        position: relative;
        display: flex;
        &.step-item--clickable {
          cursor: pointer;
        }

        .step-item__icon {
          vertical-align: top;
          font-size: var(--td-font-size-body-medium);
          margin-right: 8px;
          color: var(--td-text-color-placeholder);
        }
      }
    }
    .step-item--finish .step-item__icon--number {
      color: var(--td-text-color-placeholder);
      border: 1px solid var(--td-text-color-placeholder);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      text-align: center;
      border-radius: var(--td-radius-circle);
      margin-top: 3px;
      font-size: var(--td-font-size-body-large);
      border-color: var(--td-brand-color);
    }
    .step-item--process .step-item__icon--number {
      color: var(--td-text-color-anti);
      font-weight: 700;
      border: 1px solid var(--td-text-color-placeholder);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      text-align: center;
      margin-top: 3px;
      border-radius: var(--td-radius-circle);
      font-size: var(--td-font-size-body-large);
      border-color: var(--td-brand-color);
      background-color: var(--td-brand-color);
    }

    .step-item:not(:last-child) .step-item__title:after {
      content: '';
      display: block;
      width: 9999px;
      border-left: 0;
      border-top: 0;
      border-bottom-width: 1px;
      border-bottom-color: var(--td-text-color-placeholder);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .step-item--finish:not(:last-child) .step-item__title:after {
      border-bottom-width: 2px;
      border-bottom-color: var(--td-brand-color);
      color: var(--td-brand-color);
    }
  }
</style>
