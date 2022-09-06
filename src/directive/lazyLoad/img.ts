function handleLoadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
}
export default class image {
  public loaded = false;
  public options;
  public imgRender;
  public src;
  public state;
  public el;
  constructor(options) {
    const { el, options: opts, imgRender, src } = options;
    this.options = opts;
    this.el = el;
    this.imgRender = imgRender;
    this.src = src;
    this.state = {
      loading: false,
      error: false,
    };
  }
  // 懒加载 图片加载的src 是服务器上的图片
  // dom.style 只能获取dom上面绑定的 内联的style
  // 插件思想 提供对外的借口 怎样处理的
  //  两个类之间是如何 相互配合完成功能的
  //  在scroll里面循环当前的imgpool 看看 当前的在视口内的img 有没有被加载
  checkIsVisible() {
    const { top } = this.el.getBoundingClientRect();
    return top < window.innerHeight * (this.options.preload || 1.3);
  }
  loadImg() {
    this.imgRender(this, 'loading');
    handleLoadImg(this.src).then(
      () => {
        this.state.loading = true;
        this.loaded = true;
        this.imgRender(this, 'success');
      },
      () => {
        this.state.error = true;
        this.loaded = true;
        this.imgRender(this, 'error');
      },
    );
  }
}
