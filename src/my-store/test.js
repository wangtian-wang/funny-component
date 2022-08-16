import { createMyStore } from './index';
export default createMyStore({
  state: {
    count: 1,
  },
  mutations: {
    plus(state, num) {
      console.log('state----', state.count);
      state.count += num;
      console.log('state----', state.count);
    },
  },
  actions: {
    plus2({ commit, state }, payload) {
      setTimeout(() => {
        commit('plus', payload);
      }, 1000);
    },
  },
});
