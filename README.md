# funny-component

#### 开发报错记录

```js
Make sure that you provide correct `viewBox` prop
这个错误是antd-design-icon中,使用自定义的图标一定要确保这个属性type有一个默认值
export default defineComponent({
  name: 'IconFont',
  props: {
    type: {
      type: String,
      default: 'icon-dianzan', // type不能为空
    },
  },
  setup(props) {
    return () => <MyIcon type={props.type}></MyIcon>;
  },
});
```
