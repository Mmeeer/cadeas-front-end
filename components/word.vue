<template>
  <el-col :span="12">
    <el-card shadow="hover">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Consistency" name="1" @click="conti(1)">
          <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
          <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
        </el-collapse-item>
      </el-collapse>
      <br>
      <el-form>
        <el-form-item v-if="con" >
          <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
            <el-button @click="nextWord(1)">Үргэлжлүүлэх</el-button>
          </el-row>
          <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
            Цээжлэхэд хэцүү үг:
          </el-row>
          <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
            <el-button @click="nextWord(2)" size="mini">Тусгайлан хадгалаад үргэлжлүүлэх</el-button>
          </el-row>
          <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
            Алдаа илтгэх:
          </el-row>
          <el-row style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
            <el-button @click="nextWord(3)" type="warning" size="mini">Synonym is not enough!</el-button>
            <el-button @click="nextWord(4)" type="danger" size="mini">Defination is not enough!</el-button>
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
