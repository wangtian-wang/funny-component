<template>
  <div>
    <div ref="boxRef" class="img_wrapper">
      <img ref="imgRef" v-drop-directive :src="picSrc" alt="" />
    </div>
    <input v-model="textValue" placeholder="请输入文字" @change="handleInputChange" />
    <!-- <input type="file" accept="image/*" @change="handleChooseFile" /> -->
    <a-button type="primary" @click="handleDownLoad">点击下载</a-button> <br />
    <a-button type="primary" @click="handleUpLoad">上传图片</a-button>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref, toRefs, watch } from 'vue';
  const boxRef = ref(null);
  const vDropDirective = {
    mounted(el, val, vnode) {
      const owrapWidth = parseFloat(getComputedStyle(boxRef.value).width);
      const owrapHeight = parseFloat(getComputedStyle(boxRef.value).height);
      let startX = 0;
      let startY = 0;
      let curX = 0;
      let curY = 0;
      let imgLeft;
      let imgTop;
      const maxLeft = owrapWidth - parseFloat(getComputedStyle(el).width);
      const maxTop = owrapHeight - parseFloat(getComputedStyle(el).height);
      const handleMouseUp = (e) => {
        document.removeEventListener('mousemove', mousemove, true);
        document.mousemove = null;
      };
      const mousemove = (e) => {
        e.preventDefault();
        curX = e.clientX - startX;
        curY = e.clientY - startY;

        curX = curX + imgLeft;
        curY = curY + imgTop;
        if (curX <= 0) {
          curX = 0;
        }
        if (curX >= maxLeft) {
          curX = maxLeft;
        }
        if (curY <= 0) {
          curY = 0;
        }
        if (curY >= maxTop) {
          curY = maxTop;
        }
        el.style.left = `${curX}px`;
        el.style.top = `${curY}px`;
      };
      const handleMouseDown = (e) => {
        startX = e.clientX;
        startY = e.clientY;
        imgLeft = el.offsetLeft;
        imgTop = el.offsetTop;
        /**
         * addEventListener 与 removeEventListener的参数要一模一样 否则移除不了已经绑定的事件
         */
        document.addEventListener('mousemove', mousemove, true);
        document.addEventListener('mouseup', handleMouseUp, true);
      };

      el.addEventListener('mousedown', handleMouseDown, false);
    },
    unmounted() {},
  };
  const textValue = ref('');
  const imgRef = ref(null);
  const canvasState = reactive({
    canvasWidth: 500,
    canvasHeight: 500,
  });
  const imgState = reactive({
    picSrc: require('@/assets/imageGenerator/smell.jpeg'),
    imgLeft: 100,
    imgTop: 100,
    imgUrl: '',
  });
  const textState = reactive({
    fontSize: 12,
    fontColor: '#fd2456',
    textLeft: 300,
    textTop: 400,
  });
  const { canvasWidth, canvasHeight } = toRefs(canvasState);
  let { picSrc, imgLeft, imgTop, imgUrl } = toRefs(imgState);
  const { fontSize, fontColor, textLeft, textTop } = toRefs(textState);
  const getDomStyle = (dom) => {
    imgLeft = parseFloat(getComputedStyle(dom).left);
    imgTop = parseFloat(getComputedStyle(dom).top);
  };

  const draw = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvasWidth.value;
    canvas.height = canvasHeight.value;

    const img = new Image();
    img.src = picSrc.value;

    img.onload = () => {
      ctx?.drawImage(img, imgLeft.value, imgTop.value);

      // ctx.fillStyle = '#fff';
      // ctx.fillRect(0, 0, canvas.width, canvas.height); //设置canvas的背景

      // 绘制输入的文本
      ctx.font = `bold ${fontSize.value}px Microsoft Yahei`;
      ctx.fillStyle = fontColor.value;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';
      ctx.fillText(textValue.value, textLeft.value, textTop.value);
      // 绘制水印
      ctx.font = `12px Microsoft Yahei`;
      ctx.fillStyle = 'rgba(255,255,255,.6)';
      ctx.textAlign = 'center';
      ctx.fillText('made by xx', canvasWidth.value - 50, canvasHeight.value - 50);

      imgUrl.value = canvas.toDataURL('png');

      console.log('🚀 ~ file: index.vue ~ line 60 ~ draw ~ imgUrl', imgUrl);
    };
  };

  const handleDownLoad = () => {
    draw();
    setTimeout(() => {
      download();
    }, 0);
  };
  const download = () => {
    const a = document.createElement('a');
    a.download = 'img';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.href = imgUrl.value;
    a.click();
    document.body.removeChild(a);
  };
  const handleUpLoad = () => {
    getInput();
  };
  const getInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.click();
    input.addEventListener('change', handleInputChange, false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      picSrc.value = fileReader.result;
    };
  };
</script>
<style lang="less" scoped>
  .img_wrapper {
    position: relative;
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    box-shadow: 0 0 5px #ccc;
    img {
      position: absolute;
      width: 200px;
      height: 200px;
      border: 1px solid #ccc;
      cursor: move;
    }
  }
</style>
