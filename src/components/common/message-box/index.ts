import MyMessage from './index.vue';
import { createApp, watch } from 'vue';
export const fields = ['confirm', 'prompt'];
export interface messageBox {
  confirm: () => void;
  prompt: () => void;
}
const MessageBox = (options) => {
  const messageApp = createApp(MyMessage, options);
  return new Promise((resolve, reject) => {
    showMessage(messageApp, { resolve, reject });
  });
};
fields.forEach((type) => {
  MessageBox[type] = (options) => {
    options.field = type;
    return MessageBox(options);
  };
});
const showMessage = (app, { resolve, reject }) => {
  const fragment = document.createDocumentFragment();
  const vm = app.mount(fragment);
  document.body.appendChild(fragment);
  vm.setVisiable(true);
  watch(
    () => vm.visiable,
    (visiable) => {
      if (!visiable) {
        switch (vm.isRealConfirm) {
          case 'confirm':
            resolve(vm.inputValue);
            break;
          case 'cancel':
            reject();
            break;
          default:
            break;
        }
      }
      destoryMessage(app);
    },
  );
};
const destoryMessage = (app) => {
  app.unmount();
};
export default MessageBox;
