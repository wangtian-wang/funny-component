<template>
  <Layout.Header class="page-header">
    <Space :size="20">
      <slot>
        <Space :size="20">
          <span class="menu-fold" @click="() => emit('update:collapsed', !collapsed)">
            <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"></component>
          </span>
          <Breadcrumb>
            <template v-for="item in menus" :key="item.name">
              <Breadcrumb.Item>
                <span>{{ item }}</span>
                <!-- <template v-if="item?.children?.length" #overlay>
                  <Menu :selected-keys="getSelectMenuKeys(index)">
                    <template v-for="child in item?.children" :key="child.name">
                      <Menu.Item @click="clickMenuItem(child)"> </Menu.Item>
                    </template>
                  </Menu>
                </template> -->
              </Breadcrumb.Item>
            </template>
          </Breadcrumb>
        </Space>
      </slot>
    </Space>
    <Space :size="20">
      <Search />
      <Tooltip placement="bottom">
        <LockOutlined @click="handleLock(true)"></LockOutlined>
      </Tooltip>
      <FullScreen />
      <Dropdown>
        <Avatar :src="imgSrc">{{ userInfo?.name }}</Avatar>
        <Menu>
          <Menu.Item> </Menu.Item>
        </Menu>
      </Dropdown>
      <ProjectSetting />
    </Space>
  </Layout.Header>
</template>

<script lang="tsx" setup>
  import { Layout, message, Modal, Dropdown, Menu, Space, Breadcrumb, Avatar, Tooltip, type MenuTheme } from 'ant-design-vue';
  import { QuestionCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { computed, nextTick, type CSSProperties } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  // import { FullScreen, Search, ProjectSetting } from './components/index';
  import FullScreen from './components/fullscreen/index.vue';
  import Search from './components/search/index.vue';
  import ProjectSetting from './components/setting/index.vue';
  const imgSrc = require('@/assets/avatar.jpeg');
  defineProps({
    collapsed: {
      type: Boolean,
    },
    theme: {
      type: String as PropType<MenuTheme>,
    },
  });
  const emit = defineEmits(['update:collapsed']);
  /** header 顶部的menu */
  const menus = computed(() => {
    return [];
  });

  const handleLock = (boolean: boolean) => {};
  const userStore = useUserStore();
  const userInfo = computed(() => userStore.userInfo);

  // const getSelectMenuKeys = (index: number) => {
  //   return [menus.value[index + 1]?.name] as string[];
  // };
  // const clickMenuItem = (child) => {};
</script>
<style lang="less" scoped>
  @import url('@/style/theme.less');
  .themeBgColor(page-header);
</style>
