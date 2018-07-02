import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';
 
const socket = io('http://localhost:8080');
Vue.use(VueSocketio, socket);