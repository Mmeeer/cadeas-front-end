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
          <el-button type="success" @click="goSignup" :disabled="disabled">Signup</el-button>
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
    async goSignup() {
      this.disabled = true
      console.log(this.username, this.password, this. disabled)
      await this.$axios.$post("http://localhost:8080/signup", {username: this.username, password: this.password})
      .then(async function(res){
        if(res.success){
          this.$router.push('/')
        }
      }.bind(this))
      
    }
  }
}
</script>
