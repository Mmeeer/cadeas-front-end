<template>
  <el-container>
    <el-header>
      <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <nuxt-link to="/settings" class="link"><el-dropdown-item>Settings</el-dropdown-item></nuxt-link>
          <nuxt-link to="/" class="link"><el-dropdown-item>Home</el-dropdown-item></nuxt-link>
          <nuxt-link to="/login" class="link"><el-dropdown-item>Login</el-dropdown-item></nuxt-link>
          <nuxt-link to="/register" class="link"><el-dropdown-item>Register</el-dropdown-item></nuxt-link>
          <nuxt-link to="/logout" class="link"><el-dropdown-item>Logout</el-dropdown-item></nuxt-link>
          <el-dropdown-item disabled divided>Analisys</el-dropdown-item>
          <el-dropdown-item disabled>Ranking</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <Word/>
    </el-main>
  </el-container>
</template>
<script>
import Word from '~/components/word.vue'
export default {
  components: {
    Word
  }
}
</script>
<style lang="stylus" scoped>
.el-header
  line-height 60px
  text-align right
.el-main
  min-height: 80vh
  display flex
  flex-direction column
  justify-content center
  align-items center 
</style>
