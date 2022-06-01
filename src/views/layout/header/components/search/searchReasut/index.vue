<template>
  <div> search-result </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';

  interface Props {
    value: string;
    options: any[];
  }
  interface Emits {
    (e: 'update:value', val: string): void;
    (e: 'enter'): void;
  }
  const emit = defineEmits<Emits>();
  const props = withDefaults(defineProps<Props>(), {});
  const active = computed({
    get() {
      return props.value;
    },
    set(val: string) {
      emit('update:value', val);
    },
  });
</script>
