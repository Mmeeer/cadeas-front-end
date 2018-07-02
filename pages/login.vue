<template>
  <el-container>
    <el-header>
      Login
    </el-header>
    <el-main>
      <Login/>
    </el-main>
  </el-container>
</template>
<script>
import Login from '~/components/login.vue'
export default {
  components: {
    Login
  }
}
</script>
<style lang="stylus" scoped>
.el-header
  line-height: 60px
  font-size 24px
  text-align center
.el-main
  min-height: 80vh
  display flex
  flex-direction column
  justify-content center
  align-items center 
</style>