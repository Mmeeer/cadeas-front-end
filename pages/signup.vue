<template>
  <el-container>
    <el-header>
      Signup
    </el-header>
    <el-main>
      <theSignup/>
    </el-main>
  </el-container>
</template>
<script>
import theSignup from '~/components/signup.vue'
export default {
  components:{
    theSignup
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
