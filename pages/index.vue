<template>
  <el-container>
    <el-header>
      <el-dropdown>
        <span class="el-dropdown-link">
          Lazy Ra-bit<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <nuxt-link to="/settings" class="link"><el-dropdown-item>Settings</el-dropdown-item></nuxt-link>
          <nuxt-link to="/login" class="link"><el-dropdown-item>Login</el-dropdown-item></nuxt-link>
          <nuxt-link to="/signup" class="link"><el-dropdown-item>Signup</el-dropdown-item></nuxt-link>
          <nuxt-link to="/logout" class="link"><el-dropdown-item>Logout</el-dropdown-item></nuxt-link>
          <el-dropdown-item disabled divided>Analisys</el-dropdown-item>
          <el-dropdown-item disabled>Ranking</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <div v-if="this.$store.getters.isLoggedIn">
        <div v-for="item in ip" :key="item.id">
          <Card :title="item.id"/>
        </div>
      
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Card from '~/components/card.vue'
export default{
  data() {
    return{
      ip: ''
    }
  },
  components: {
    Card
  },
  async mounted() {
    console.log(this.$store.state.id)
    if(this.$store.state.id != ''){
      const ip = await this.$axios.$get('http://206.189.154.213/api/lisa/' + this.$store.state.id)
      if(ip.success){
        this.ip = ip.data.list
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-header
  line-height 60px
  text-align right
.el-main
  min-height: 80vh;
  text-align center
</style>

