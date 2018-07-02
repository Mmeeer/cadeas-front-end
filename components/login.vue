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
          <el-button type="success">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-col>
</template>
<script>
export default {
  data(){
    return{
      username: '',
      password: ''
    }
  }
}
</script>
