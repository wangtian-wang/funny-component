<template>
  <div class="menu-container" :style="{ height: isSideMenu ? 'calc(100vh - 64px)' : '' }">
    <!--
      区别
     v-model:selected-keys="state.selectedKeys"
      selected-keys :
        是组件内部接收selectedKeys 的props是selected-keys
        组件内部是对于selected-keys这个props操作
        v-model 只不过是在组件内部改了父组件传递进来的selectedKeys这个属性
    v-model="state.selectedKeys"
      v-model用在组件上面
       该组件内部默认接收selectedKeys 的 props 是 modelValue


    -->
    <a-menu
      v-model:selected-keys="state.selectedKeys"
      :open-keys="isSideMenu ? state.openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="theme"
      :collapsed="props.collapsed"
      collapisble
      @click="handleMenuItemClick">
      <template v-for="item in menus" :key="item.path || item.fullPath">
        <MenuItem :menu-info="item"></MenuItem>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, computed, watch, type PropType } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { type MenuTheme } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import { useThemeStore } from '@/store/modules/projectConfig';
  import { LOGIN_NAME } from '@/router/constant';
  import MenuItem from './menu-item.vue';

  const themeStore = useThemeStore();
  // 侧边栏布局
  const isSideMenu = computed(() => themeStore.layout === 'sidemenu');
  // 组件数据
  const props = defineProps({
    collapsed: {
      type: Boolean,
    },
    theme: {
      type: String as PropType<MenuTheme>,
    },
  });
  const userStore = useUserStore();
  const menus = computed(() => userStore.menus);
  console.log('🚀 ~ file: menu.vue ~ line 54 ~ menus', menus);

  const currentRoute = useRoute();
  const router = useRouter();
  const state = reactive({
    openKeys: [] as string[], //当前展开的 目录和菜单
    selectedKeys: [currentRoute.path] as string[], //当前高亮的菜单
  });
  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    return (currentRoute.meta?.namePath ??
      currentRoute.matched.slice(1).map((n) => n.name)) as string[];
  };
  watch(
    () => currentRoute.fullPath,
    () => {
      if (currentRoute.name === LOGIN_NAME || props.collapsed) return;
      state.openKeys = getOpenKeys();
      state.selectedKeys = [currentRoute?.path] as string[];
    },
    {
      immediate: true,
    },
  );
  const handleMenuItemClick = ({ key }) => {
    if (key === currentRoute.name) return;
    if (/http(s)?:/.test(key)) {
      window.open(key);
    } else {
      router.push(key);
    }
  };
</script>
<style lang="less"></style>
