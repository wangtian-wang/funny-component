<template>
  <div>
    <h1>this is a demo about message box</h1>
    <a-button type="primary" @click="showConfirmMessage"> confirm</a-button>
    <a-button type="primary" danger @click="showMessage"> default</a-button>
    <a-button type="primary" @click="showPromptMessage"> prompt</a-button> <br />
    <h1>this is a demo about message</h1>
    <a-button type="primary" @click="showDefaultMsg"> default</a-button>
    <a-button type="primary" @click="showSuccessMsg"> seccess</a-button>
    <a-button type="primary" @click="showFailMessage"> fail</a-button>
    <a-button type="primary" @click="showWarningMessage"> warning</a-button>

    <popover title="Title">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <a-button type="primary">Hover me</a-button>
    </popover>
  </div>
</template>

<script lang="ts" setup>
  import { Popover, Button as AButton } from 'ant-design-vue';
  /**message box */
  import MyMessage from '@/components/common/message-box/index';
  /**messages */
  import Message from '@/components/common/message/index';
  const showMessage = () => {
    MyMessage({
      title: 'confirm title',
      confirmBtnText: '确定',
      content: 'this is a default message',
    })
      .then(() => {
        console.log('confirm message was called success');
      })
      .catch(() => {
        console.log('confirm message was called fail');
      });
  };
  const showConfirmMessage = () => {
    MyMessage.confirm({
      content: 'this is a confirm message',
      duration: 2000,
    });
  };

  const showPromptMessage = () => {
    MyMessage.prompt({
      content: 'this is a prompt message',
      duration: 2000,
      feild: 'prompt',
      showCancleBtn: true,
    })
      .then((val) => {
        console.log('prompt message was called success', val);
      })
      .catch(() => {
        console.log('confirm message was called fail');
      });
  };

  const showDefaultMsg = () => {
    Message({
      content: 'this is default message info',
      duration: 2000,
      field: 'info',
    });
  };
  const showSuccessMsg = () => {
    Message.success({
      content: 'this is success message info',
      duration: 2000,
    });
  };
  const showFailMessage = () => {
    Message.fail({
      content: 'this is fail message info',
      duration: 2000,
    });
  };
  const showWarningMessage = () => {
    Message.warning({
      content: 'this is warning message info',
      duration: 2000,
    });
  };
</script>
