import Message from './index.vue';
import { createApp, ref, watch } from 'vue';
export const fields = ['info', 'fail', 'success', 'warning'];
const messageArr = ref([]);
const MyMessage = (options) => {
  const messageApp = createApp(Message, options);
  ShowMessage(messageApp, options);
};
fields.forEach((type) => {
  MyMessage[type] = (options) => {
    options.field = type;
    return MyMessage(options);
  };
});
const ShowMessage = (app, options) => {
  const oFrag = document.createDocumentFragment();
  const vm = app.mount(oFrag);
  messageArr.value.push(vm);
  document.body.appendChild(oFrag);
  setTop(vm);
  watch(
    () => messageArr,
    () => {
      setTop(vm);
    },
  );
  vm.setVisiable(true);
  hideMessage(app, vm, options.duration);
};
const hideMessage = (app, vm, duration) => {
  vm.timer = setTimeout(async () => {
    await vm.setVisiable(false);
    app.unmount();
    messageArr.value = messageArr.value.filter((item) => item !== vm);
    clearTimeout(vm.timer);
    vm.timer = null;
  }, duration || 3000);
};
const setTop = (vm) => {
  const { setTop, height, margin } = vm;
  const curIndex = messageArr.value.findIndex((item) => item === vm);
  setTop(margin * (curIndex + 1) + curIndex * height);
};
export default MyMessage;
