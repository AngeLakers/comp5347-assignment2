<template>
  <el-container>
    <el-header> <Header></Header> </el-header>
    <!-- <el-aside >Aside</el-aside> -->
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
</template>
<script>
import Header from "./header.vue";
export default {
  components: {
    Header
  }
};
</script>
<style>
.el-main{
  width: 1180px;
  margin: 0 auto;
   padding: 0 0 20px;
  text-align: left;
  position: relative;
  top: 60px;
}
.el-header{
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
}
</style>
