<template>
  <div
    :class="['water_mark_container', { water_mark_block: block }]"
    :style="[waterMarkStyle, { zIndex }]">
    water mark 啦啦啦啦了</div
  >
</template>

<script lang="ts" setup name="WaterMark">
  import { onMounted, ref } from 'vue';
  import { Props } from './index';
  import { createImg, useFilterProp } from './utils';
  const prop = defineProps(Props);
  console.log(prop, 'in mark');
  const baseWaterMark = () => {
    const needProps = useFilterProp(prop, ['content', 'width', 'height', 'fontSize', 'fontColor']);
    const waterMark = createImg(needProps);
    return {
      backgroundImage: `url(${waterMark})`,
    };
  };
  const waterMark = () => {
    const { image, width, height } = prop;
    return {
      backgroundImage: `url(${image})`,
      backgroundSize: `${width}px ${height}px`,
    };
  };
  const waterMarkStyle = ref({});
  onMounted(() => {
    waterMarkStyle.value = prop.image ? waterMark() : baseWaterMark();
  });
</script>
<style scoped lang="scss">
  .water_mark_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    &.water_mark_block {
      /* display: block;  优先级高*/
      height: 700px;
    }
  }

  .water_mark_block {
    /* display: block; */
    height: 600px;
  }
</style>
