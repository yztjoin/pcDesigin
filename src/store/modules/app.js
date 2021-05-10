const app = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    updateUserInfo(state, data) {
      state.userInfo = data;
    }
  },
  actions: {
    changeUserInfo(store, data) {
      store.commit('updateUserInfo', data);
    }
  },
  getters: {
    userInfo: (state) => state.userInfo
  }
}

export default app;
