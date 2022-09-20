export const Props = {
  content: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 300,
  },
  height: {
    type: Number,
    default: 200,
  },
  fontSize: {
    type: String,
    default: (): string => '30px',
  },
  fontColor: {
    type: String,
    default: (): string => '#333',
  },
  image: {
    type: String,
    default: (): string => '',
  },
  block: {
    type: Boolean,
    default: (): boolean => true,
  },
  zIndex: {
    type: Number,
    default: (): number => 100,
  },
};
