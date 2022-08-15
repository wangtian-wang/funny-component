import { computed, ref } from 'vue';
const map = new WeakMap();

const useCounter = (data) => {
  const count = ref(data);
  const decrement = () => {
    count.value - 1;
  };
  const increment = () => {
    count.value + 1;
  };
  return {
    count,
    decrement,
    increment,
  };
};
export default function useCount(hook) {
  if (!map.get(hook())) {
    const obj = hook();
    map.set(hook, obj);
  }
  return map.get(hook);
}
// 多个组件调用useCount返回的是同一个状态
