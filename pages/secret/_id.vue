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
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="list-item">
            {{workingOn[it].word}}
            <br>
            <div v-if="!(theWord.syllables === undefined)">
              <p class="para">
                Syllables: 
                {{theWord.syllables.count}} |
                <span v-for="syl in theWord.syllables.list" :key="syl">
                  -{{syl}}
                </span>
              </p>
            </div>
          </div>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="Click here if you give up and want to see hint!" name="1" @click="conti(1)">
              <div class="list-item" v-for="(item, index) in theWord.results" :key="index">
                <span v-if="!(item.definition === undefined)">Definition {{index + 1}} {{item.partOfSpeech}} : {{item.definition}}</span>
                <br>
                <span v-if="!(item.synonyms === undefined)">Synonyms {{index + 1}} : <span v-if="item.synonyms" v-for="synonym in item.synonyms" :key="synonym"> {{synonym}} </span></span>
              </div>
            </el-collapse-item>
          </el-collapse>
          <br>
          <el-form>
            <el-form-item v-if="con" >
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <el-button @click="nextWord(1)">Үргэлжлүүлэх</el-button>
              </el-row>
              <div v-if="ttype == '3' || ttype == '4'">
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                Буруу санасан бол:
              </el-row>
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <el-button @click="nextWord(2)" size="mini">Буруу санасан үргэлжлүүлэх</el-button>
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
                <el-button @click="conti(1)" type="danger" size="mini">Ёстой Сандаггүй ээ.</el-button>
                <el-button @click="conti(2)" type="warning" size="mini">Харсан үг байна бүрэн сандаггүй ээ.</el-button>
              </el-row>
              <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <el-button @click="conti(3)" type="primary" size="mini">Нийтлэг утгыг нь санаж байна.</el-button>
                <el-button @click="conti(4)" type="success" size="mini">Бүүр бүх илэрхийлдэг утгатай нь санаж байна</el-button>
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
      workingOn: [{word: "loading"}],
      activeNames: [''],
      con: false,
      ttype: '',
      theWord: {
        syllables: {
          count: 0,
          list: []
        },
        results: []
      },
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
      var tmp = val.data.workingOn
      console.log(tmp)
      var i;
      for(i = 0; i < tmp.length; i++){
        if(tmp[i].scored == true) continue;
        else {
          this.it = i;
          break;
        }
      }
      if(i == tmp.length){
        console.log('deep shit')
        this.socket.emit("finished", {day: this.url, token: this.token})
      }
      this.workingOn = val.data.workingOn
      this.data = {
        round: val.data.round,
        start: val.data.start,
        end: val.data.end,
        newwords: val.data.newwords,
        oldwords: val.data.oldwords
      }
      this.$socket.emit('word', {token: this.token, day: this.url, word: this.workingOn[this.it].word})
    },
    word: function(val){
      console.log(val)
      this.theWord = {
        syllables: val.data.syllables,
        results: val.data.results
      }
    },
    progress: function(val){
      console.log(val)
      if(val.saved == true){
        console.log("hellow")
        this.it = this.it+1
        if(this.it == this.workingOn.length){
          this.workingOn.push({word: "Loading!"})
          this.$socket.emit('finished', {day: this.url, token: this.token})
        } else {
          this.$socket.emit('word', {token: this.token, day: this.url, word: this.workingOn[this.it].word})
        }
        this.activeNames = ['']
        this.con = false
        this.ttype = ''
      }
    }
  },
  mounted(){
    this.url = this.$route.params.id
    this.token = this.$store.state.token
    
    this.$socket.emit('day', {day: this.url, token: this.token})
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
    nextWord(val){
      console.log(val)
      console.log(this.ttype)
      var tmp = Number(this.ttype)
      if(tmp > 2){
        tmp = 1
      } else {
        tmp = 0
      }
      if(val == 2) tmp = 0
      this.workingOn[this.it].scored = true
      var ress = Math.floor(this.it/4)
      if(tmp == 0) ress = -1
      this.workingOn[this.it].ans = String(ress + 1)
      var j, tmp;
      for(j = 0; j < this.data.newwords.length; j++){
        if(this.data.newwords[j].word == this.workingOn[this.it].word){
          this.data.newwords[j].ans.push({ans: ress + 1})
          this.data.newwords[j].score += ress+1
          tmp = this.data.newwords[j]
          break;
        }
      }
      if(j == this.data.newwords){
        for(j = 0; j < this.data.oldwords.length; j++){
          if(this.data.oldwords[j].word == this.workingOn[this.it].word){
            this.data.oldwords[j].ans.push({ans: ress + 1})
            this.data.oldwords[j].score += ress+1
            tmp = this.data.oldwords[j]
            break;
          }
        }
      }
      this.$socket.emit('progress', {day: this.url, token: this.token, word: tmp.word, change: tmp, data: {round: this.data.round, start: this.data.start, end: this.data.end, newwords: this.data.newwords, oldwords: this.data.oldwords, workingOn: this.workingOn}})
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
