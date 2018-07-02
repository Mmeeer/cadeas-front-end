<template>
  <el-container>
    <el-header>
      <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <nuxt-link to="/settings" class="link"><el-dropdown-item>Settings</el-dropdown-item></nuxt-link>
          <nuxt-link to="/login" class="link"><el-dropdown-item>Login</el-dropdown-item></nuxt-link>
          <nuxt-link to="/register" class="link"><el-dropdown-item>Register</el-dropdown-item></nuxt-link>
          <nuxt-link to="/logout" class="link"><el-dropdown-item>Logout</el-dropdown-item></nuxt-link>
          <el-dropdown-item disabled divided>Analisys</el-dropdown-item>
          <el-dropdown-item disabled>Ranking</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <Card/>
      <Card/>
      <Card/>
      {{ip}}
      <el-button @click="clickButton(1)">Button</el-button>
    </el-main>
  </el-container>
</template>

<script>
import Card from '~/components/card.vue'
export default{
  components: {
    Card
  },
  sockets: {
    connect: function(){
      console.log('socket')
    },
    news: function(val){
      console.log(val)
    }
  },
  methods: {
    async fetchSomething() {
      const ip = await this.$axios.$get('http://localhost:8080/')
      this.ip = ip
    },
    clickButton: function(val){
      this.$socket.emit('event', {number: 1})
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

