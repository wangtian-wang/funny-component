<template>
  <div :class="baseClass">
    <!-- 将关于父组件中处理的数据传递给子组件 -->

    <template v-for="(item, idx) in options" :key="item">
      <StepItem
        :title="item.title"
        :content="item.content"
        :item="item"
        :value="item.value"
        :icon="item.icon"
        :status="handleStatus(item, idx)"
        :index="handleIndex(idx)">
        <template v-if="current === idx" #extra>
          <div>上一步</div>
        </template>
      </StepItem>
    </template>

    <!-- 插槽写法 -->
    <!-- <slot></slot> -->
  </div>
</template>

<script lang="ts" setup>
  /**
   * step 组件获取到 自己的插槽 step-item,但是无法获取每个step-item内部的插槽情况
   *
   *
   *
   * 采取目前的写法 slot是能正常显示了 但是每个step-item的属性 又无法传递了
   */
  import { provide, reactive, VNode, watchEffect, ref, toRefs, useSlots, computed } from 'vue';
  import Prop from './props';
  import stepItemProps from '../../steps-item/src/props';
  import { useChildComponentSlots, useVModel } from '../../hook';

  const slots = !!useSlots().hello;

  // init props
  const props = defineProps(Prop);

  const { current, modelValue } = toRefs(props);
  const [innerCurrent, setInnerCurrent] = useVModel(
    current,
    modelValue,
    props.defaultCurrent,
    props.onChange,
    'current',
  );

  // init indexMap
  const indexMap = ref({});
  // get slot content
  const getChildComponentByName = useChildComponentSlots();
  // 获取组件的被传递值的prop
  const getOptionListBySlots = (nodes: VNode[]) => {
    const arr: any[] = [];
    nodes?.forEach((node) => {
      const option = node?.props || {};
      const children = node?.children;
      if (!option && !children) return;
      if (children && typeof children === 'object' && typeof children !== null) {
        for (const key in children) {
          if (key in stepItemProps && !option[key]) {
            option[key] = children[key];
          }
        }
      }
      props.sequence === 'reverse' ? arr.unshift(option) : arr.push(option);
    });
    return arr;
  };
  // 获取给step-item行内绑定的属性 同时也可以直到模板中 一共使用了几个item
  const getOptions = () => {
    let options: any = [];
    if (props.options?.length) {
      options = props.sequence === 'reverse' ? props.options.slice().reverse() : props.options;
    } else {
      const nodes = getChildComponentByName('StepItem');
      options = getOptionListBySlots(nodes);
    }
    return options;
  };

  watchEffect(() => {
    getOptions()?.forEach((item, index) => {
      if (item.value !== undefined) {
        indexMap.value[item.value] = index;
      }
    });
  });

  // provide
  provide(
    'StepState',
    reactive({
      current: innerCurrent,
      options: getOptions(),
      setCurrent: setInnerCurrent,
    }),
  );
  provide('StepProps', props);

  // 计算当前 step item 的状态 标记为 finish process default
  /*
     普通配置下 itemProps 没有status 使用index进行判断
     innerCurrent 是 step组件的prop current 表示当前进行到哪一步

   */
  const handleStatus = (itemProps: any, index: number) => {
    if (itemProps.status && itemProps.status !== 'default') return itemProps.status;
    if (innerCurrent.value === 'finish') return 'finish';
    // value 不存在时，使用 index 进行区分每一个步骤
    if (itemProps.value === undefined && index < innerCurrent.value) return 'finish';
    // value 存在，找匹配位置
    if (itemProps.value !== undefined) {
      const matchIndex = indexMap.value[innerCurrent.value];
      if (matchIndex === undefined) {
        console.warn('TDesign Steps Warn: The current `value` is not exist.');
        return 'default';
      }
      if (props.sequence === 'positive' && index < matchIndex) return 'finish';
      if (props.sequence === 'reverse' && index > matchIndex) return 'finish';
    }
    const key = itemProps.value === undefined ? index : itemProps.value;
    if (key === innerCurrent.value) return 'process';
    return 'default';
  };

  const options = getOptions();
  const handleIndex = (index) => {
    const stepIndex = props.sequence === 'reverse' ? options.length - index - 1 : index;
    return stepIndex;
  };
  provide('handleStatus', {
    handleStatus,
    handleIndex,
  });
  // class
  const COMPONENT_NAME = ref('step');
  const baseClass = computed(() => {
    return [
      COMPONENT_NAME.value,
      `${COMPONENT_NAME.value}--${props.layout}`,
      `${COMPONENT_NAME.value}--${props.sequence}`,
      `${COMPONENT_NAME.value}--${props.separator}-separator`,
    ];
  });
</script>
<script lang="ts">
  export default {
    name: 'Step',
  };
</script>
/** step step-item 都是组件, 组件中想要渲染别的内容就得使用插槽 那这两个组件之间的关系是怎样的呢?
--> provide 父组件的一些特性 决定了子组件的展示方式 step 组件 接收 一级状态 step item
接收组件自己的状态 一级状态影响二级状态 welcome组件中的stepitem 会被渲染为插槽 怎样将父组件的属性
传给step item 也就是插槽 */ ~
<style lang="scss" scoped></style>
