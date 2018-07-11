<template>
  <div></div>
</template>
<script>
  export default {
    data() {
      return {
        activeNames: [''],
        con: false,
        ttype: ''
      }
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
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .el-collapse
    font-size 24px
</style>
