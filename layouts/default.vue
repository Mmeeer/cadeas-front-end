<template>
  <div>
    <nuxt/>
  </div>
</template>
<script>
import {getCookie} from 'tiny-cookie'
    
export default {
  beforeMount(){
    this.$store.state.token = getCookie('token')
    this.$store.state.id = getCookie('id')
    if((this.$store.state.token == 'a' && this.$store.state.id == 'a') || (this.$store.state.token == null && this.$store.state.id == null)){
      this.$store.state.token = ''
      this.$store.state.id = ''
    } else {
      if(this.$store.state.token.length > 0 && this.$store.state.id.length){
        this.$store.commit('setAxios')
      }
    }
    console.log("hello")
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
.link{
  text-decoration: none;
}
</style>
