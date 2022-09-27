<template>
  <Tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
    <span @click="toggle">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </Tooltip>
</template>

<script lang="ts" setup>
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  import { Tooltip } from 'ant-design-vue';
  import { computed, unref } from 'vue';
  import { useFullscreen } from '@vueuse/core';
  const { toggle, isFullscreen } = useFullscreen();
  const getTitle = computed(() => {
    return unref(isFullscreen) ? '全屏' : '非全屏';
  });
</script>
