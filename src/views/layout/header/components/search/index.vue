<template>
  <Tooltip>
    <!-- <slot>
      <SearchOutlined @click="visiable = true"></SearchOutlined>
    </slot> -->
    <a-input ref="inputRef" v-model:value="keyWords" clearable aria-placeholder="请输入关键词搜索" @change="handleSearch">
      <template #prefix>
        <SearchOutlined class="" />
      </template>
    </a-input>
    <div>
      <!-- <Empty v-if="resultOptions.length === 0" description="暂无搜索结果" /> -->
      <!-- <SearchResult v-else v-model:value="activePath" :options="resultOptions" @enter="handleEnter" /> -->
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
  import { ref, watch, nextTick, shallowRef } from 'vue';
  import { Tooltip, Empty } from 'ant-design-vue';
  import { SearchOutlined } from '@ant-design/icons-vue';

  import SearchResult from './searchReasut/index.vue';

  const visiable = ref(false);
  const keyWords = ref('');
  const inputRef = ref<HTMLElement | null>(null);
  const resultOptions = shallowRef([]);
  const activePath = ref('');
  watch(visiable, async (val) => {
    if (val) {
      await nextTick();
      inputRef.value?.focus();
    }
  });
  const handleSearch = (e) => {};
  const handleEnter = () => {};
</script>
