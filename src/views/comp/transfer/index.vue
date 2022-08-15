<template>
  <div class="transfer-options">
    <select @change="setTitleIndex($event.target.value)">
      <option v-for="(item, index) in titleOption" :key="item" :value="index">{{ item }}</option>
    </select>
  </div>
  <div class="transfer-box">
    <div class="transfer-left">
      <h3> left title : {{ leftTitle }} {{ leftOptions.length }}</h3>
      <div
        v-for="item in leftOptions"
        :key="item.id"
        class="option-item"
        draggable="true"
        @dragstart="handleDragStart(item)">
        <label>
          <input
            :disabled="item.disabled"
            type="checkbox"
            :checked="item.checked"
            @click="handleChange(item, 'left')" />
          {{ item.text }}
        </label>
      </div>
    </div>
    <div class="transfer-button">
      <button class="btn" @click="toLeft">&lt;</button>
      <button class="btn" @click="toRight">&gt; </button>
    </div>
    <div class="transfer-right" @dragover="handleDragOver" @drop="handleDrop">
      <h3> right title : {{ rightTitle }} {{ rightOptions.length }}个</h3>
      <div v-for="item in rightOptions" :key="item.id" class="option-item">
        <label for="">
          <input
            type="checkbox"
            :disabled="item.disabled"
            :checked="item.checked"
            @click.stop="handleChange(item, 'right')" />{{ item.text }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    useTitle,
    useSelectedTitleIndex,
    useComputedData,
    useEventHandler,
    useDragHooks,
  } from './hooks/index';

  const [titleOption, rightTitle] = useTitle();
  const [selectedTitleIndex, setTitleIndex] = useSelectedTitleIndex(0);
  const [leftTitle, leftOptions] = useComputedData(selectedTitleIndex);
  const [rightOptions, leftClick, rightClick, toLeft, toRight] = useEventHandler(
    leftOptions,
    selectedTitleIndex,
  );
  const handleChange = (item, type) => {
    item.checked = !item.checked;
    if (type == 'left') {
      leftClick(item);
    } else {
      rightClick(item);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const [handleDragStart, handleDrop] = useDragHooks(rightOptions, leftOptions);
</script>
<style lang="scss" scoped>
  .transfer-box {
    display: flex;
    width: 800px;
    height: 600px;
    border: 1px solid #eee;
    div {
      flex: 1;
    }
    .option-item {
      cursor: move;
    }
    div:nth-child(1) {
      border-right: 1px solid #eee;
    }
    div:nth-child(3) {
      border-left: 1px solid #eee;
    }
    .transfer-button {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        outline: none;
        border: none;
        width: 38px;
        height: 28px;
        border-radius: 5px;
        color: #fff;
        background-color: rgb(28, 112, 214);
      }
      button:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
</style>
