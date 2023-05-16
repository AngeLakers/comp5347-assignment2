<template>

  <div>
    <el-card class="box-card">
      <ul v-if="list.length">
        <li v-for="item in list" :key="item._id" class="text item">
          <good :item="item"></good>
        </li>
      </ul>
      <el-empty v-else description="no mobile phone" />
    </el-card>
  </div>

  </template>
  <script>
  import good from "./components/good.vue"
   import {searchList} from "../../request/api"
  export default {
    components: { good},
    created(){
      this.init()
    },
    data() {
      return {
        list:[]
      }
    },
    watch: {
    '$route.query': {
      immediate: true, // 立即执行监听函数
      deep: true, // 深度监听对象的变化
      handler(newQuery, oldQuery) {
        // 处理query参数变化的逻辑
        this.init(newQuery)
      }
    },
  },
    methods:{
      async init(param){
      this.list = await searchList(param)
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
