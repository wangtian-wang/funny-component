<template>
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed, type CSSProperties } from 'vue';
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
    return requireContext.keys().forEach(requireContext);
  };
  try {
    importAll(require.context('@/assets/icons', true, /\.svg$/));
  } catch (err) {
    console.log(err);
  }
  const props = defineProps({
    prefix: {
      type: String,
      default: 'svg-icon',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 16,
    },
  });

  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    const s = `${size}`.replace('px', '').concat('px');
    return {
      width: s,
      height: s,
    };
  });
</script>
<style lang="less" scoped>
  .svg-icon {
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }
</style>
