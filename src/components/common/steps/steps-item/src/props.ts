import { StepsItemsProps } from '../../types';
export default {
  content: {
    type: [String, Function],
    default: '',
  },
  default: {
    type: [String, Function],
  },
  extra: {
    type: [String, Function],
  },
  icon: {
    type: [Boolean, Function],
    default: true,
  },
  title: {
    type: [String, Function],
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  index: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'default',
    validator(val: StepsItemsProps['status']): boolean {
      if (!val) return true;
      return ['default', 'process', 'finish', 'error'].includes(val);
    },
  },
};
