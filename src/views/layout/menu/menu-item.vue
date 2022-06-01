<template>
  <div class="wrapper">
    <template v-if="isShowSubMenu">
      <a-sub-menu :key="menuInfo?.path" v-bind="$attrs">
        <template #title>
          <IconFont :type="menuInfo.meta.icon"></IconFont>
          <span class="icon-menu">{{ menuInfo?.meta?.title }}</span>
        </template>
        <template v-for="child in menuInfo.children" :key="child.path || child.fullPath">
          <!-- 递归生成子菜单 -->
          <MenuItemSelf :menu-info="child" />
        </template>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="menuInfo?.path">
        <IconFont :type="menuInfo.meta.icon"></IconFont>
        <span>{{ menuInfo?.meta?.title }}</span>
      </a-menu-item>
    </template>
  </div>
</template>

<script>
  import { computed, defineComponent } from 'vue';
  import { Menu } from 'ant-design-vue';
  // import {} from 'vue-router';
  export default defineComponent({
    name: 'MenuItemSelf',
    props: {
      menuInfo: {
        type: Object,
      },
    },
    setup(props) {
      const isShowSubMenu = computed(() => {
        const menuInfo = props.menuInfo;
        return menuInfo?.meta?.type === 0 || menuInfo?.children?.length;
      });
      return {
        isShowSubMenu,
      };
    },
  });
</script>
<style lang="less" scoped>
  .ant-menu-inline.ant-menu-root .ant-menu-item > .ant-menu-title-content span:nth-child(2) {
    margin-left: 10px;
  }
  .ant-menu-inline.ant-menu-root
    .ant-menu-submenu-title
    > .ant-menu-title-content
    span:nth-child(2) {
    margin-left: 10px;
  }
</style>
