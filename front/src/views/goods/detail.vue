<template>
  <div>
    <!-- 内容部分 -->
        <el-card class="box-card">
          <div class="box">
            <div class="left">
              <img :src="$imgUrl + obj.brand + '.jpeg'" alt="" />
            </div>
            <div class="right">
              <div class="nameBox">
                <p>Title: {{ obj.title }}</p>
                <p>Brand: {{ obj.brand }}</p>
                <p>Available stock: {{ obj.stock }}</p>
                <p>Seller's name:{{ obj.seller }}</p>
              </div>
              <div class="PriceBox">
                <p class="price">Price: {{ obj.price }}</p>
                <div>
                  Add to the card:
                  <el-button type="text" @click="handleAdd"
                    >add</el-button
                  >
                </div>
              </div>
            </div>
          </div>

          <el-collapse
            v-model="activeNames"
            @change="handleChange"
            accordion
          >
            <el-collapse-item title="Rating :" name="1">
              <template slot="title">
                Rating: <span>{{ flag }}</span>
              </template>
              <div
                class="collapse-item-Box"
                v-for="item in obj.reviews"
                :key="item._id"
              >
                <div>Reviewer name: {{ item.reviewer?item.reviewer.lastname +' '+item.reviewer.firstname:""}}</div>
                <div>Rating: {{ item.rating }}</div>
                <div>Comment(within 200 characters): {{ item.comment }}</div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>

    <el-dialog title="add to the cart" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="Num">
            <el-input-number v-model="form.num"  :min="1" :max="obj.stock" ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleClickSubmit">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from "../../store"
export default {
  data() {
    return {
      obj: {},
      activeNames: ["1"],
      total: 0,
      flag: "Hide",
      dialogVisible: false,
      addList:[], // 存储增加的数据数组
      form: {
        num: 1
      }
    };
  },
  created() {
    this.total = JSON.parse(localStorage.getItem('total'))
    this.obj = JSON.parse(localStorage.getItem("phoneInfo"))
    if (localStorage.getItem("addList")) {
        this.addList = JSON.parse(localStorage.getItem("addList"));
      }
  },
  methods: {
    handleAdd(){
       const find = this.addList.find(v=>v._id==this.obj._id)
       if(find&&find.num>=this.obj.stock){
        return this.$message.warning("Inventory shortage")
       }
      this.form.num=1
      this.dialogVisible = true
    },
    handleChange() {
      if (this.activeNames[0] == "1") {
        this.flag = "Hide";
      } else {
        this.flag = "Show";
      }
    },
    handleClickSubmit() {
      if (localStorage.getItem("addList")) {
        this.addList = JSON.parse(localStorage.getItem("addList"));
      }
      const find = this.addList.find(v=>v._id==this.obj._id)
      if(find&&find.num>=this.obj.stock){
        return this.$message.warning("Inventory shortage")
       }
      this.total = Number(this.total) + Number(this.form.num);
      localStorage.setItem("total", this.total); // 总数量
      this.dialogVisible = false;
      if(find){
        find.num=find.num*1+this.form.num;
      }else{
      this.obj.num = this.form.num; // 每一个的数量
        this.addList.push(this.obj);
      }
      this.$message.success("Add to Cart successful")
      store.commit("setCartTotal",this.addList)
      localStorage.setItem("addList", JSON.stringify(this.addList));
      console.log(this.addList);
    }
  }
};
</script>
<style scoped>
.box-card {
  margin-top: 10px;
}
.price {
  color: rgb(255, 0, 0);
}
.box {
  display: flex;
}
 .nameBox {
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 15px 0;
 }
 .nameBox p {
  padding: 5px 0;
}
 .left {
  width: 350px;
  height:100%;
}
.right {
 flex: 1;
 margin-left: 10px;
}
img {
  width: 100%;
  height: 100%;
}
.el-collapse-item__content .collapse-item-Box {
  border-bottom: 1px solid #ccc;
}
/deep/ .el-collapse-item__header {
  justify-content: space-between !important;
}
/deep/ .el-collapse-item__arrow{
  display: none;
}
</style>
