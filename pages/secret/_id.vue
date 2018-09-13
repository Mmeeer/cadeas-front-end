<template>
<el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']" default-active="1-1">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>General</template>
        <el-menu-item-group>
          <template slot="title">General</template>
          <el-menu-item index="1-1" active @click="changeThis(0)">Random order</el-menu-item>
          <el-menu-item index="1-2" @click="changeThis(1)">Alpha Betical</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Specialized">
          <el-menu-item index="1-3" @click="changeThis(2)">Order by Good</el-menu-item>
          <el-menu-item index="1-4" @click="changeThis(3)">Order by Bad</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">Pick some</template>
          <el-menu-item index="1-5-1" @click="changeThis(4)">Pick random 10</el-menu-item>
          <el-menu-item index="1-5-2" @click="changeThis(5)">Pick Good 10</el-menu-item>
          <el-menu-item index="1-5-3" @click="changeThis(6)">Pick Bad 10</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Play Quiz</template>
        <el-menu-item-group>
          <template slot="title">All words</template>
          <el-menu-item index="2-1">Random order</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Pick some">
          <el-menu-item index="2-2">Pick 10</el-menu-item>
          <el-menu-item index="2-3">Pick 20</el-menu-item>
          <el-menu-item index="2-4">Pick 40</el-menu-item>
          <el-menu-item index="2-5">Pick 50</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">Option 4</template>
          <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>Play Card Game</template>
        <el-menu-item-group>
          <template slot="title">General</template>
          <el-menu-item index="3-1" @click="cardgame('random')">Random order</el-menu-item>
          <el-menu-item index="3-2" @click="cardgame('alpha')">Alpha Betical</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Specialized">
          <el-menu-item index="3-3" @click="cardgame('weakness')">Play By weakness</el-menu-item>
          <el-menu-item index="3-4" @click="cardgame('adventage')">Play By adventage</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-5">
          <template slot="title">Pick and play</template>
          <el-menu-item index="3-5-1" @click="cardgame('pickrandom')">Random 10</el-menu-item>
          <el-menu-item index="3-5-2" @click="cardgame('pickweak')">Weak 10</el-menu-item>
          <el-menu-item index="3-5-3" @click="cardgame('pickbest')">Best 10</el-menu-item>
          <el-menu-item index="3-5-4" @click="addcardgame()">Pick</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>

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

    <el-main v-if="(it == 0 || it == 1 || it == 2 || it == 3) && this.loading == false">
      <el-row>
        <el-button v-if="words.length != 0" v-for="word in words" :key="word" @click="thisWord(word.word)">{{word.word}}</el-button>
      </el-row>
    </el-main>
    <el-main v-if="(it == 4 || it == 5 || it == 6) && this.loading == false">
      <el-row>
        <el-button v-if="words.length != 0" v-for="word in picked_words" :key="word" @click="thisWord(word.word)">{{word.word}}</el-button>
      </el-row>
    </el-main>
    <el-main v-if="it == 11 && this.loading == false">
      <el-card class="box-card">
        right: {{this.cardgameDataAns.right}}
        wrong: {{this.cardgameDataAns.wrong}}
        <div slot="header" class="clearfix">
          <span>{{this.cardgameData[cardgameIndex].word}}</span>
        </div>
        <div class="text item">
          <el-button style="float: left; margin: auto" type="text" @click="itDoesnt()">It doesn't</el-button>

          <el-button style="float: right; padding: 3px 0" type="text" @click="itDoes()">It flashes</el-button>

        </div>
      </el-card>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  export default {
    data() {
      return {
        url: '',
        token: '',
        words: [],
        picked_words: [],
        tmp: [],
        it: 0,
        loading: false,
        cardgameData: {},
        cardgameDataAns: {},
        cardgameIndex: null
      }
    },
    async mounted(){
      this.loading = true;
      this.url = this.$route.params.id
      this.token = this.$store.state.token
      var ip = await this.$axios.$get('http://localhost:8080/getall/' + this.url)
      console.log(ip)
      if(ip.success){
        this.words = ip.data.list
      }
      console.log(this.words)
      this.loading = false
    },
    methods: {
      changeThis: function(id){
        this.picked_words = [];
        this.tmp = [];
        this.loading = true;
        this.it = id
        if(this.it == 0){
          shuffle(this.words);
        }
        if(this.it == 1){
          this.words.sort(function(a,b) {
            if (a.word < b.word)
              return -1;
            if (a.word > b.word)
              return 1;
            return 0;
          })
        }
        if(this.it == 2){
          console.log("SHIT")
          this.words.sort(function(a,b) {
            if (a.score < b.score)
              return -1;
            if (a.score > b.score)
              return 1;
            return 0;
          })
        }
        if(this.it == 3){
          this.words.sort(function(a,b) {
            if (a.score > b.score)
              return -1;
            if (a.score < b.score)
              return 1;
            return 0;
          })
        }
        if(this.it == 4){
          this.tmp = shuffle(this.words.slice());
          for(var i = 0; i < 10; i++){
            this.picked_words.push(this.tmp[i])
          }
        }
        if(this.it == 5){
          this.tmp = this.words.slice();
          this.tmp.sort(function(a, b){
            if (a.score < b.score)
              return -1
            if(a.score > b.score)
              return 1
            return 0;
          })
          for(var i = 0; i < 10; i++){
            this.picked_words.push(this.tmp[i])
          }
        }
        if(this.it == 6){
          this.tmp = this.words.slice();
          this.tmp.sort(function(a, b){
            if (a.score < b.score)
              return 1
            if(a.score > b.score)
              return -1
            return 0;
          })
          for(var i = 0; i < 10; i++){
            this.picked_words.push(this.tmp[i])
          }
        }
        this.loading = false;
      },
      async thisWord(word){
        console.log(word)
        var ip = await this.$axios.$get('http://localhost:8080/word/' + this.url + "/" + word )
        if(ip.success){
          console.log(ip)
        }
        var results = ip.theWord.results;
        var resultString = '';
        for(var i = 0; i < results.length; i++){
          resultString += '<strong>' + results[i].partOfSpeech + '</strong> ';
          resultString += '<i>' + results[i].definition + '</i>' + '</br>';
        }
        this.$alert(resultString, word, {
          confirmButtonText: 'OK',
          dangerouslyUseHTMLString: true,
        });
      },
      async cardgame(type){
        console.log(type);
        this.loading = true;
        var ip = await this.$axios.$get('http://localhost:8080/cardgame/' + this.url + "/" + type )
        if(ip.success){
          console.log(ip)
        }
        this.cardgameData = ip.data;
        this.cardgameIndex = ip.now;
        this.cardgameDataAns = {right: ip.right, wrong: ip.wrong}
        this.it = 11;
        this.loading = false;
      },
      addcardgame(){
        console.log("Hello adding cards to game");
      },
      async itDoesnt(){
        this.loading = true;
        var ip = await this.$axios.$get('http://localhost:8080/cardgameAns/' + this.url + "/" + 'itDoesnt')
        if(ip.success){
          this.cardgameData[this.cardgameIndex].ans.push({success: false});
          this.cardgameIndex++;
          this.cardgameDataAns.wrong++;
          console.log("SUccess")
        }
        this.loading = false;
      },
      async itDoes(){
        var ip = await this.$axios.$get('http://localhost:8080/cardgameAns/' + this.url + "/" + 'itDoes')
        if(ip.success){
          this.cardgameData[this.cardgameIndex].ans.push({success: true});
          this.cardgameData[this.cardgameIndex].score++;
          this.cardgameDataAns.right++;
          this.cardgameIndex++;
          console.log("SUccess")
        }
      }
    }
  };
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
</script>
<style lang="styl">
.el-header
  line-height 60px
  text-align right

.el-aside
  color: #333;
.el-button
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 10px;
  margin-left: 10px;
.box-card
  max-width 500px
  margin auto
</style>
