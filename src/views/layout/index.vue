<template>
  <Layout class="layout">
    <Layout.Sider
      v-if="themeStore.layout === 'sidemenu'"
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :theme="getTheme"
      :trigger="null"
      collapsible>
      <PageMenu :collapsed="collapsed" :theme="getTheme" />
    </Layout.Sider>
    <div class="layout-wrapper">
      <PageHeader v-model:collapsed="collapsed" :theme="getTheme">
        <template v-if="themeStore.layout === 'topmenu'" #default>
          <!-- <Logo :collapsed="collapsed"></Logo> -->
          <h1>top menu</h1>
          <PageMenu :collapsed="collapsed" :theme="getTheme" />
        </template>
      </PageHeader>
      <Layout.Content class="layout-content">
        <router-view v-slot="{ Component }">
          <component :is="Component" :key="route.fullPath"></component>
        </router-view>
      </Layout.Content>
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { Layout } from 'ant-design-vue';
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useThemeStore } from '@/store/modules/projectConfig';
  import PageHeader from './header/index.vue';
  import PageMenu from './menu/menu.vue';
  // import RouterView from './router-view/index.vue';

  const collapsed = ref(false);
  const asiderWidth = computed(() => {
    return collapsed.value ? 80 : 220;
  });
  const themeStore = useThemeStore();
  const route = useRoute();

  const getTheme = computed(() => (themeStore.navTheme === 'light' ? 'light' : 'dark'));
</script>
<style scoped lang="less">
  @import url('@/style/theme.less');
  .themeBgColor(layout-wrapper);
  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
    .ant-layout {
      overflow: hidden;
    }
    .layout-content {
      flex: 1;
      height: 100%;
      padding: 14px;
    }
    .layout-wrapper {
      width: 100%;
    }
  }
</style>
