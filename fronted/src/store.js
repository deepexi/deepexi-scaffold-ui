import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    loginState(state, data) {
      state.isLogin = data
    },
  },
  actions: {

  }
})
