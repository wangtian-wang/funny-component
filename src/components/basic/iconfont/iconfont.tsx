import { createFromIconfontCN } from '@ant-design/icons-vue';
import { computed, defineComponent } from 'vue';
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
    width: {
      type: Number,
      default: 20,
    },
    marginRight: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const baseStyle = computed(() => {
      return {
        width: `${props.width}px`,
        marginRight: `${props.marginRight}px`,
      };
    });
    return () => <MyIcon type={props.type} style={baseStyle.value}></MyIcon>;
  },
});
