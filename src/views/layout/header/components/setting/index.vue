<template>
  <SettingOutlined @click="showDrawer" />
  <Drawer v-model:visible="visible" placement="right" :closable="false">
    <Descriptions title="整体风格" :column="5">
      <Descriptions.Item v-for="item in themeStyle" :key="item.value">
        <div>
          <Tooltip :title="item.label">
            <div
              class="style-box"
              :class="{ active: themeStore.navTheme === item.value }"
              @click="setNavTheme(item.value)">
              <svg-icon :name="item.value" size="50"></svg-icon>
            </div>
          </Tooltip>
        </div>
      </Descriptions.Item>
    </Descriptions>
    <Descriptions title="主题色" :column="9">
      <Descriptions.Item v-for="item in themeColors" :key="item.key">
        <div class="style-box">
          <Tooltip :title="item.title">
            <Tag :color="item.value" @click="setThemeColor({ primaryColor: item.value })">
              <span :style="{ visibility: getThemeColorVisible(item.value) }"> ✔ </span>
            </Tag>
          </Tooltip>
        </div>
      </Descriptions.Item>
    </Descriptions>
    <Descriptions title="导航模式" :column="5">
      <Descriptions.Item v-for="item in layouts" :key="item.value">
        <div
          class="style-box"
          :class="{ active: themeStore.layout === item.value }"
          @click="setLayout(item.value)">
          <svg-icon :name="item.value" size="50"></svg-icon>
        </div>
      </Descriptions.Item>
    </Descriptions>
  </Drawer>
</template>

<script lang="ts" setup>
  import { ref, computed, type StyleValue } from 'vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { Drawer, Descriptions, Tag, Tooltip } from 'ant-design-vue';
  import { layouts, themeColors, themeStyle } from './constant';
  import {
    type Theme,
    type themeColor,
    type themeState,
    useThemeStore,
  } from '@/store/modules/projectConfig';
  // defineOptions({
  //   name: 'ProjectSetting',
  // });
  const themeStore = useThemeStore();
  // const customColor = ref(themeStore.primaryColor);
  const visible = ref(false);
  // const colorPickerStyle = computed(() => {
  //   return {
  //     '--custom-color': customColor.value,
  //   } as StyleValue;
  // });
  const setNavTheme = (theme: themeColor) => {
    themeStore.setTheme({ navTheme: theme });
  };
  const setThemeColor = ({ primaryColor }: Theme) => {
    themeStore.fillColor({ primaryColor });
  };
  const setLayout = (layout: themeState['layout']) => {
    themeStore.setTheme({ layout });
  };
  const getThemeColorVisible = (color) => {
    return themeStore.primaryColor === color ? 'visible' : 'hidden';
  };
  const showDrawer = () => {
    visible.value = true;
  };
</script>
<style lang="less" scoped>
  .style-box {
    position: relative;
    cursor: pointer;
    &.active:after {
      content: '✔';
      position: absolute;
      bottom: 10px;
      right: 12px;
      color: greenyellow;
    }
  }
</style>
