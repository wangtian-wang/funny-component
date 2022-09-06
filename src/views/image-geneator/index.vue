<template>
  <div class="container" style="color: antiquewhite">
    <!-- <ImageGeneator></ImageGeneator> -->
    <template v-if="imgData.length >= 1">
      <div v-for="img in imgData" :key="img.id">
        <img v-lazy="img.src" :src="img.src" alt="" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const imgData = ref<any[]>([]);
  const imgFn = async () => {
    for (let i = 1; i <= 10; i++) {
      const res = await import(`./img/${i}.jpg`);
      imgData.value.push({ src: res.default, id: i });
    }
  };
  imgFn();
  console.log(img);

  // import ImageGeneator from '@/components/common/image-geneator/index.vue';
</script>
<style scoped>
  .container {
    overflow-y: scroll;
    height: 100vh;
  }
  img {
    width: 500px;
  }
</style>
