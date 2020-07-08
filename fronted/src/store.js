import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem("isLogin"),
    loginData: localStorage.getItem("loginData")
  },
  mutations: {
    loginState(state, data) {
      localStorage.setItem('isLogin', data)
      state.isLogin = data
    },
    loginUpdateData(state, data) {
      localStorage.setItem('loginData', data)
      state.loginData = data
    },
  },
  actions: {

  }
})
