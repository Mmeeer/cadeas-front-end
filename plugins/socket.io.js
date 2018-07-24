import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';
 
const socket = io('http://206.189.154.213/api');
Vue.use(VueSocketio, socket);