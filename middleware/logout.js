import {removeCookie} from 'tiny-cookie'
export default function({store, redirect}){
  removeCookie('token')
  removeCookie('id')
  store.state.token = ''
  store.state.id = ''
  store.commit('removeAxios')
  redirect('/')
}