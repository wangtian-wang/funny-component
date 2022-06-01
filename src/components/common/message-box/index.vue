<template>
  <transition name="message-fade">
    <div v-show="visiable" class="message-container" @click="closeBtnClick">
      <div class="message-wapper" @click.stop>
        <div class="message-box-title">
          <h1>{{ title }}</h1>
          <span class="iconfont icon-roundclose" @click="closeBtnClick"></span>
        </div>
        <div class="message-box-content">
          <ContentView :field="field"></ContentView>
        </div>
        <div class="message-box-footer">
          <button class="btn btn-primary" @click="confirmBtnClick">{{ confirmBtnText }}</button>
          <button v-if="showCancleBtn" class="btn btn-close" @click="cancelBtnClick">{{
            cancelBtnText
          }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { ref, defineExpose, h } from 'vue';
  import { fields } from './index';

  const visiable = ref(false);
  const inputValue = ref('');
  const isRealConfirm = ref('');
  const props = defineProps({
    title: {
      type: String,
      default: 'message box',
    },
    field: {
      type: String,
      default: 'confirm',
      validator(value: string) {
        return fields.includes(value);
      },
    },
    content: {
      type: String,
      default: 'this is a content of message box',
    },
    confirmBtnText: {
      type: String,
      default: 'ok',
    },
    cancelBtnText: {
      type: String,
      default: 'cancel',
    },
    showCancleBtn: {
      type: Boolean,
      default: false,
    },
  });
  const setVisiable = (value) => {
    visiable.value = value;
  };
  const confirmBtnClick = () => {
    isRealConfirm.value = 'confirm';
    setVisiable(false);
  };
  const cancelBtnClick = () => {
    isRealConfirm.value = 'cancel';

    setVisiable(false);
  };
  const closeBtnClick = () => {
    setVisiable(false);
  };
  // 根据 feild来确定中间content的渲染内容
  const ContentView = ({ field }) => {
    switch (field) {
      case !field || 'confirm':
        return h('p', null, props.content);
      case 'prompt':
        return h('input', {
          value: inputValue.value,
          onInput: (e) => (inputValue.value = e.target.value),
          class: 'message-input',
        });
      default:
        return '';
    }
  };

  defineExpose({
    setVisiable,
    visiable,
    inputValue,
    isRealConfirm,
  });
</script>
<style scoped lang="less">
  @font-face {
    font-family: 'iconfont'; /* Project id 1964092 */
    src: url('//at.alicdn.com/t/font_1964092_tderfz7ytj.woff2?t=1653876866244') format('woff2'),
      url('//at.alicdn.com/t/font_1964092_tderfz7ytj.woff?t=1653876866244') format('woff'),
      url('//at.alicdn.com/t/font_1964092_tderfz7ytj.ttf?t=1653876866244') format('truetype');
  }

  .iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-roundclose:before {
    content: '\e659';
  }
  .message-fade-enter-from,
  .message-fade-leave-to {
    opacity: 0;
  }
  .message-fade-enter-active,
  .message-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .message-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    .message-wapper {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 420px;
      height: 200px;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      background-color: #fff;
      p,
      h1 {
        margin: 0;
        font-weight: normal;
      }
      .message-box-title {
        padding: 15px 15px 10px;
        h1 {
          display: inline-block;
          font-size: 18px;
          color: #999;
        }
        .icon-roundclose {
          float: right;
          font-size: 14px;
          color: #ccc;
          cursor: pointer;
        }
      }
      .message-box-content {
        padding: 10px 15px;

        p {
          font-size: 14px;
        }
      }
      .message-box-footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 5px 10px 15px;
        button {
          float: right;
          padding: 5px 15px;
          cursor: pointer;
        }
      }
    }
    .btn {
      border: none;
      outline: none;
      border-radius: 5px;

      &.btn-primary {
        background-color: #4093ff;
        color: #fff;
        margin-left: 10px;
      }
      &.btn-close {
        background-color: #fff;
        border: 1px solid #ddd;
      }
    }
    .message-input {
      border: none;
      outline: none;
      width: 100%;
      border: 1px solid #ededed;
      height: 32px;
      line-height: 32px;
    }
  }
</style>
