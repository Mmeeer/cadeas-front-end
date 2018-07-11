<template>
  <el-col :span="8">
    <nuxt-link :to="'/secret/' + title" class="link">
      <el-card shadow="hover" style="margin: 10px; padding: 20px;">
        Day {{title + 1}}
      </el-card>
    </nuxt-link>
  </el-col>
</template>
<script>
export default {
  props: ['title']
}
</script>
