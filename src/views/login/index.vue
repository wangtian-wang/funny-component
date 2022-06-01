<template>
  <div class="login">
    <div class="login-logo">
      <h1 class="mb-0 ml-2 text-3xl">vue3 component</h1>
    </div>
    <a-form layout="horizontal" :model="state.formInfo" @submit.prevent="handleSubmit">
      <a-form-item>
        <a-input v-model:value="state.formInfo.username" size="large" placeholder="goodcoder">
          <template #prefix><user-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="state.formInfo.password" size="large" type="password" placeholder="123456" autocomplete="new-password">
          <template #prefix><lock-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="state.formInfo.verifyCode" placeholder="验证码" :maxlength="4" size="large">
          <template #prefix><SafetyOutlined /></template>
          <template #suffix>
            <img :src="state.captcha" class="absolute right-0 h-full cursor-pointer" @click="setCaptcha" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="btn-wrapper">
        <a-button type="primary" html-type="submit" size="large" :loading="state.loading" block> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  const state = reactive({
    loading: false,
    captcha: '',
    formInfo: {
      username: '',
      password: '',
      verifyCode: '',
    },
  });
  const userStore = useUserStore();
  const router = useRouter();
  const handleSubmit = async () => {
    const { username, password, verifyCode } = state.formInfo;
    if (username.trim() == '' || password.trim() == '') {
      return message.warning('用户名或密码不能为空!');
    }
    if (!verifyCode) {
      return message.warning('验证码不能为空');
    }
    message.loading('登录中...');
    state.loading = true;
    try {
      await userStore.login(state.formInfo).finally(() => {
        state.loading = false;
        message.destroy();
      });
      message.success('登录成功');

      router.replace('/dashboard/welcome');
    } catch (err) {
      console.log('err : ', err);
    }
  };
  const setCaptcha = () => {};
</script>
<style lang="less" scoped>
  .login {
    display: flex;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background: url('~@/assets/login.svg');
    // background-color: black;
    background-size: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login-logo {
      display: flex;
      margin-bottom: 30px;
      flex-direction: column;
      align-items: center;
    }

    :deep(.ant-form) {
      width: 400px;

      .ant-col {
        width: 100%;
      }

      .ant-form-item-label {
        padding-right: 6px;
      }
    }
  }
  .btn-wrapper {
    :deep(.ant-form-item-control) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
    }
  }
</style>
