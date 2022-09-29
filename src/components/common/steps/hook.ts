import { getCurrentInstance, VNode, Slots, Fragment, Component, ref } from 'vue';

export function useChildComponentSlots() {
  const instance = getCurrentInstance();
  return (childComponentName: string, slots?: Slots): VNode[] => {
    if (!slots) {
      slots = instance?.slots;
    }

    const content = slots?.default?.() || [];
    // 满足基于基础组件封装场景，递归找到子组件
    const childList: VNode[] = [];
    const getChildren = (content: VNode[]) => {
      if (!Array.isArray(content)) return;
      content.forEach((item: VNode) => {
        if (item.children && Array.isArray(item.children)) {
          if (item.type !== Fragment) return;
          getChildren(item.children as VNode[]);
        } else {
          childList.push(item);
        }
      });
      return childList;
    };

    return getChildren(content).filter((item: VNode) =>
      (item.type as Component).name?.endsWith(childComponentName),
    ) as VNode[];
  };
}

/**根据step传递的属性 确定 current 和返回一个setCurrent函数 */
export function useVModel(value, modelValue, defaultValue, onChange, propName = 'value') {
  const { emit, vnode } = getCurrentInstance();
  const internalValue = ref();
  const vProps = vnode.props || {};
  const isVM = Object.prototype.hasOwnProperty.call(vProps, 'modelValue');
  const isVMP = Object.prototype.hasOwnProperty.call(vProps, propName);

  if (isVM) {
    return [
      modelValue,
      (newValue, ...args) => {
        emit('update:modelValue', newValue);
        onChange?.(newValue, ...args);
      },
    ];
  }
  // 闭包函数, 修改step组件的current,当该闭包函数返回时, propname已经确定为current
  if (isVMP) {
    return [
      value,
      (newValue, ...args) => {
        emit(`update:${propName}`, newValue);
        onChange?.(newValue, ...args);
      },
    ];
  }

  internalValue.value = defaultValue;
  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue;
      onChange?.(newValue, ...args);
    },
  ];
}
