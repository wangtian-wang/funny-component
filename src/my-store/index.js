/**
 自己实现的vuex4 在app.vue页面进行测试
 */

import { reactive, inject } from 'vue';
class Store {
  constructor(state, mutations, actions) {
    this.state = state;
    this.mutations = mutations;
    this.actions = actions;
  }
  install(app) {
    const store = {};
    store.state = reactive(this.state);
    store.commit = (type, payload) => {
      this.mutations[type](store.state, payload);
    };
    store.dispatch = (type, payload) => {
      this.actions[type]({ commit: store.commit, state: store.state }, payload);
    };
    app.provide('myStore', store);
  }
}
export const createMyStore = ({ state, mutations, actions }) => {
  return new Store(state, mutations, actions);
};
export const useMyStore = () => {
  const myStore = inject('myStore');
  return myStore;
};
