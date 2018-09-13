<template>
  <el-col :span="8">
    <el-card shadow="hover">
      <el-form>
        <el-form-item>
          <el-input placeholder="Username" v-model="username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="Password" type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="success" @click="goLogin" :disabled="disabled">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-col>
</template>
<script>
import { setCookie } from 'tiny-cookie'
export default {
  data(){
    return{
      username: '',
      password: '',
      disabled: false
    }
  },
  methods:{
    async goLogin() {
      this.disabled = true
      console.log(this.username, this.password, this. disabled)
      await this.$axios.$post("http://localhost:8080/login", {username: this.username, password: this.password})
      .then(async function(res){
        if(res.success){
          console.log(res)
          setCookie('token', res.data.token, {expires: '4h'})
          setCookie('id', res.data.id, {expires: '4h'})
          await this.$store.commit('setData', {token: res.data.token, id: res.data.id})
          this.$router.push('/')
        }
      }.bind(this))

    }
  }
}
</script>
