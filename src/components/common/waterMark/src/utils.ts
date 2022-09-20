import { reactive } from 'vue';
export const createImg = (props: any): string => {
  const canvas = document.createElement('canvas');
  const radio = window?.devicePixelRatio || 1;
  canvas.width = props.width * radio;
  canvas.height = props.height * radio;
  canvas.style.width = `${props.width}px`;
  canvas.style.height = `${props.height}px`;
  const content = canvas.getContext('2d');
  if (content) {
    content.rotate((-8 * Math.PI) / 100);
    content.font = `${props.fontSize}serif`;
    content.fillStyle = props.fontColor;
    content.textAlign = 'left';
    content.textBaseline = 'middle';
    content.fillText(props.content, props.width / 20, props.height);
  }
  return canvas.toDataURL('image/png');
};

export const useFilterProp = (props: any, arr: string[]) => {
  const needProps = reactive({});
  for (const key of arr) {
    if (key) {
      needProps[key] = props[key];
    }
  }
  return needProps;
};
