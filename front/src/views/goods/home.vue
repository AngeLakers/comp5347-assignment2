<template>

<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Sold out soon:</span>
    </div>

    <ul>
      <li v-for="item in soldData" :key="item._id" class="text item">
        <good :item="item"></good>
      </li>
    </ul>


  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Best sellers:</span>
    </div>
    <ul>
      <li v-for="item in bestData" :key="item._id" class="text item">
        <good :item="item"  type="sellers"></good>
      </li>
    </ul>

  </el-card>
</div>

</template>
<script>
import good from "./components/good.vue"
 import {soldList,bestList} from "../../request/api"
export default {
  components: { good},
  created(){
    this.init()
  },
  data() {
    return {
      soldData:[],
      bestData:[]
    }
  },
  methods:{
    async init(){
    this.soldData = await soldList()
    this.bestData= await bestList()
    },

  }
};
</script>
<style scoped>
.box-card{
  margin-top: 10px;
}
ul{
  display: grid;
  grid-template-columns: repeat();
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px 20px;
  height: fit-content;
}
li{
  height: fit-content;
  overflow: hidden;
}
</style>
