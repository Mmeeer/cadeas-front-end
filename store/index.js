import Vuex from 'vuex'
import { removeCookie, getCookie } from 'tiny-cookie'
const createStore = () => {
  return new Vuex.Store({
    state: {
      token: '',
      id: ''
    },
    getters: {
      isLoggedIn(state){
        return (state.token.length > 0)
      },
      sendToken(state){
        return state.token
      }
    },
    mutations: {
      setData (state, data) {
        state.token = data.token
        state.id = data.id
        this.$axios.setToken(state.token)
      },
      setAxios(state){
        this.$axios.setToken(state.token)
      },
      removeAxios(state){
        this.$axios.setToken(false)
      }
    }
  })
}

export default createStore