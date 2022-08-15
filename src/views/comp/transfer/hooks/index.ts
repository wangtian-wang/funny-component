import { list } from '../mock';
import { ref, computed, Ref } from 'vue';
const data = ref(list);
export const useTitle = () => {
  const titleOption = ref<string[]>([]);
  titleOption.value = data.value.map((item) => item.title);
  const rightTitle = ref('已选择项目');
  return [titleOption, rightTitle];
};
export const useSelectedTitleIndex = (index: number) => {
  const selectedTitleIndex = ref<number>(index);
  const setTitleIndex = (curIndex: number) => {
    selectedTitleIndex.value = Number(curIndex);
  };
  return [selectedTitleIndex, setTitleIndex];
};
export const useComputedData = (index) => {
  const leftTitle = computed(() => {
    return data.value[index.value].title;
  });

  const leftOptions = computed({
    get: () => data.value[index.value].data,
    set: (val) => {
      data.value[index.value].data = val;
    },
  });
  return [leftTitle, leftOptions];
};

export const useEventHandler = (leftOptions, index) => {
  let selectedInLeft = []; // 记住在左侧点击时候的 被选中的item  点击右箭头 需要清空当前左边选中的
  let selectedInRight: any[] = []; //  记住在右侧点击时候 被选中的item   点击左箭头 需要清空右边当前选中的
  const rightOptions = ref<any>([]);
  const leftClick = (e: any): void => {
    if (e.checked && !selectedInLeft.includes(e)) {
      selectedInLeft.push(e);
    }
  };

  const toRight = () => {
    const res = leftOptions.value.filter((item) => item.checked === false);
    leftOptions.value = res;
    const addDataToRight = () => {
      const temp = [];
      selectedInLeft.forEach((item) => {
        item.checked = false;
        if (!rightOptions.value.includes(item)) {
          temp.push(item);
        }
      });
      return temp;
    };
    rightOptions.value = [...rightOptions.value, ...addDataToRight()];
    selectedInLeft = [];
  };
  const rightClick = (e: any): void => {
    if (e.checked && !selectedInRight.includes(e)) {
      selectedInRight.push(e);
    }
  };
  const toLeft = () => {
    rightOptions.value = rightOptions.value.filter((item) => item.checked === false);
    data.value.forEach((item) => {
      selectedInRight.forEach((val) => {
        if (val.pTitle === item.title && !item.data.includes(val)) {
          val.checked = false;
          item.data.push(val);
        }
      });
    });
    selectedInRight = [];
  };
  return [rightOptions, leftClick, rightClick, toLeft, toRight, selectedInLeft];
};
export const useDragHooks = (rightOptions: Ref, leftOptions) => {
  const item = [];
  const handleDragStart = (e) => {
    if (!item.includes(e)) {
      item.push(e);
    }
  };
  const handleDrop = () => {
    item.forEach((val) => {
      if (!rightOptions.value.includes(val)) rightOptions.value.push(val);
    });
    leftOptions.value = leftOptions.value.filter((val) => !item.includes(val));
  };
  return [handleDragStart, handleDrop];
};
