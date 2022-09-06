import Img from './img';
import { nextTick } from 'vue';
export function getParent(dom: Element) {
  let parent = dom.parentNode;
  let overFlow = '';
  while (parent) {
    overFlow = getComputedStyle(parent)['overflow'];
    const res = /(auto)|(scroll)/.test(overFlow);
    if (!res) {
      parent = parent.parentNode;
    } else {
      return parent;
    }
  }
}

export function lazyLoading(App) {
  return class LazyLoad {
    public isAddListener = false;
    public imagePool: any[] = [];
    constructor(public options) {
      this.options = options;
    }
    bindLazy(el, binding) {
      nextTick(() => {
        const parent = getParent(el)!;
        if (parent && !this.isAddListener) {
          parent.addEventListener('scroll', this.handleScroll.bind(this), false);
        }
      });
      const { value } = binding;
      const img = new Img({
        options: this.options,
        el,
        src: value,
        imgRender: this.imgRender.bind(this),
      });
      this.imagePool.push(img);
      this.handleScroll();
    }
    handleScroll() {
      let isVisible = false;
      this.imagePool.forEach((img) => {
        if (!img.loaded) {
          isVisible = img.checkIsVisible();
          isVisible && img.loadImg();
        }
      });
    }
    imgRender(imgInstance, state) {
      // 根据img的状态 (loading error )来加载对应的资源 src
      const { el, src: imgSrc, options } = imgInstance;
      const { loadingSrc, errorSrc } = options;
      let src = '';
      switch (state) {
        case 'loading':
          src = loadingSrc || '';
          break;
        case 'error':
          src = errorSrc || '';
          break;
        default:
          src = imgSrc;
          break;
      }
      el.setAttribute('src', src);
    }
  };
}
