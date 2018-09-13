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
      Your mastered words: {{mastered}}
      <el-col v-if="workingOn.word != 'loading'" :span="12">
        <el-card shadow="hover">
          <div class="list-item">
            {{workingOn.word}}
            <br>
            <div v-if="!(workingOn.syllables === undefined)">
              <p class="para">
                Syllables:
                {{workingOn.syllables.count}} |
                <span v-for="syl in workingOn.syllables.list" :key="syl">
                  -{{syl}}
                </span>
              </p>
            </div>
          </div>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="Click here if you give up and want to see hint!" name="1" @click="conti(1)">
              <div class="list-item" v-for="(item, index) in workingOn.results" :key="index">
                <span v-if="!(item.definition === undefined)">Def{{index + 1}}, {{item.partOfSpeech}}: {{item.definition}}</span>
                <br>
                <span v-if="!(item.synonyms === undefined)">Syn{{index + 1}} : <span v-if="item.synonyms" v-for="synonym in item.synonyms" :key="synonym"> {{synonym}} </span></span>
              </div>
            </el-collapse-item>
          </el-collapse>
          <br>
          <el-form>
            <el-form-item v-if="con" >
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <el-button @click="nextWord(1)" :disabled="loading">Үргэлжлүүлэх</el-button>
              </el-row>
              <div v-if="ttype == '3' || ttype == '4'">
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                Буруу санасан бол:
              </el-row>
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <el-button @click="nextWord(2)" size="mini" :disabled="loading">Буруу санасан үргэлжлүүлэх</el-button>
              </el-row>
              </div>
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                Алдаа илтгэх:
              </el-row>
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <el-button @click="nextWord(3)" type="warning" size="mini" disabled>Synonym is not enough!</el-button>
                <el-button @click="nextWord(4)" type="danger" size="mini" disabled>Defination is not enough!</el-button>
              </el-row>
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                Алдааг илтгэснээр энэхүү систем улам бүр сайжирч чадна.
              </el-row>
            </el-form-item>
            <el-form-item v-if="!con">
              <el-row style="margin-bottom: 10px; display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <el-button @click="conti(1)" type="danger" size="mini" :disabled="loading">Ёстой Сандаггүй ээ.</el-button>
                <el-button @click="conti(2)" type="warning" size="mini" :disabled="loading">Харсан үг байна бүрэн сандаггүй ээ.</el-button>
              </el-row>
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <el-button @click="conti(3)" type="primary" size="mini" :disabled="loading">Нийтлэг утгыг нь санаж байна.</el-button>
                <el-button @click="conti(4)" type="success" size="mini" :disabled="loading">Бүүр бүх илэрхийлдэг утгатай нь санаж байна</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-main>
  </el-container>
</template>
<script>
import Word from '~/components/word.vue'
export default {
  data() {
    return {
      url: '',
      token: '',
      it: 0,
      workingOn: {word: "loading"},
      wordId: null,
      activeNames: [''],
      con: false,
      ttype: '',
      mastered: 0,
      loading: false,
      data: {

      }
    }
  },
  components: {
    Word
  },
  sockets: {
    connect: function(){
      console.log('socket')
    },
    news: function(val){
      console.log(val)
      this.$socket.emit('word', {day: this.url, token: this.token, wordId: val.wordId})
      this.wordId = val.wordId
    },
    word: function(val){
      console.log(val)
      this.workingOn = val.theWord
      this.$socket.emit('mastered', {day: this.url, token: this.token})
    },
    mastered: function(val){
      this.mastered = val.mastered;
    },
    error: function(val){
      console.log(val)
    }
    // progress: function(val){
    //   console.log(val)
    //   if(val.saved == true){
    //     console.log("hellow")
    //     this.it = this.it+1
    //     if(this.it == this.workingOn.length){
    //       this.workingOn.push({word: "Loading!"})
    //       this.$socket.emit('finished', {day: this.url, token: this.token})
    //     } else {
    //       this.$socket.emit('word', {token: this.token, day: this.url, word: this.workingOn[this.it].word})
    //     }
    //     this.activeNames = ['']
    //     this.con = false
    //     this.ttype = ''
    //   }
    // }
  },
  async mounted(){
    this.loading = true;
    this.url = this.$route.params.id
    this.token = this.$store.state.token
    var ip = await this.$axios.$get('http://localhost:8080/day/' + this.url)
    if(ip.success){
      this.wordId = ip.wordId
    }
    ip = await this.$axios.$get('http://localhost:8080/word/' + this.url + "/" + this.wordId )
    if(ip.success){
      this.workingOn = ip.theWord
    }
    console.log(ip)
    ip = await this.$axios.$get('http://localhost:8080/mastered/' + this.url)
    if(ip.success){
      this.mastered = ip.mastered
    }
    this.loading = false
  },
  methods: {
    handleChange(val) {
      if(val.length > 1 && this.ttype == ''){
        this.ttype = '1'
        this.con = true
      }
    },
    conti(val){
      this.ttype = String(val)
      this.activeNames = ['1']
      this.con = true
    },
    async nextWord(val){
      this.loading = true;
      console.log(Number(this.ttype))
      var ip = await this.$axios.$get('http://localhost:8080/progress/' + this.url + "/" + this.wordId + "/" + this.ttype)
      if(ip.success){
        this.wordId = ip.wordId
      }
      this.activeNames = ['']
      this.con = false
      this.ttype = ''
      ip = await this.$axios.$get('http://localhost:8080/word/' + this.url + "/" + this.wordId )
      if(ip.success){
        this.workingOn = ip.theWord
      }
      ip = await this.$axios.$get('http://localhost:8080/mastered/' + this.url)
      if(ip.success){
        this.mastered = ip.mastered
      }
      this.loading = false;
    }
  }
}
// export default {
//     data() {
//       return {
//         activeNames: [''],
//         con: false,
//         ttype: ''
//       }
//     },
//     methods: {
//       handleChange(val) {
//         if(val.length > 1 && this.ttype == ''){
//           this.ttype = '1'
//           this.con = true
//         }
//       },
//       conti(val){
//         this.ttype = String(val)
//         this.activeNames = ['1']
//         this.con = true
//       },
//       nextWord(val){
//         console.log(val)
//       }
//     }
//   }
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
.list-item
  font-size: 24px
  .para
    font-style italic
</style>
