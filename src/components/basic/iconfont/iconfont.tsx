import { createFromIconfontCN } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
const MyIcon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_3439533_1shyhb5bbiu.js',
    '//at.alicdn.com/t/c/font_3439533_t9x40myga9.js',
  ],
});
export default defineComponent({
  name: 'IconFont',
  props: {
    type: {
      type: String,
      default: 'icon-dianzan',
    },
  },
  setup(props) {
    return () => <MyIcon type={props.type}></MyIcon>;
  },
});
