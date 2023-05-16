<template>
  <div class="maxBox">
    <div class="mainBox">
      <div class="header">
        <div class="headerBox w">
          <div class="title">
            Shopping cart
          </div>
        </div>
      </div>
      <div v-if="list.length">

      <div class="item" v-for="(item, index) in list" :key="item._id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button
              @click="handleDel(item, index)"
              style="float: right; padding: 3px 0"
              type="text"
            >
              <i class="el-icon-error"></i>
            </el-button>
          </div>
          <div class="itemBox">
            <div class="left">
              <img :src="$imgUrl + item.brand + '.jpeg'" alt="" />
            </div>
            <div class="right">
              <p class="title">Title: {{ item.title }}</p>
              <p>Total: {{ item.stock }}</p>
              <p class="Price">Price: {{ item.price }}</p>
              <div class="num">
                Num:
                <el-input-number
                  v-model="item.num"
                  controls-position="right"
                  size="mini"
                  :min="1"
                  :max="item.stock"
                ></el-input-number>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="total">Total price:{{ total }}</div>

      <div class="button w">
        <el-button type="primary" @click="handleSubmit"
          >Confirm transaction</el-button
        >
      </div>
    </div>
      <el-empty v-else description="Shopping cart no data "/>

    </div>
  </div>
</template>
<script>
import store from "../../store"
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    total() {
      let total = 0;
      this.list.map(item => {
        total += item.num * item.price;
      });
      store.commit("setCartTotal",this.list)
      return total.toFixed(2);
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.list = JSON.parse(localStorage.getItem("addList"))||[];
    },
    handleDel(item, index) {
      this.$confirm("Confirm delete?", "Delete", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          const list = this.list.filter(v => v._id != item._id);
          localStorage.setItem("addList", JSON.stringify(list));
          store.commit("setCartTotal",list)
          this.getList();
          this.$message({
            type: "success",
            message: `Successfully deleted`
          });
        })
        .catch(() => {});
    },
    handleSubmit() {
      this.$confirm("OK to place an order", "Place an order", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("addList");
          setTimeout(()=>{
            this.$message({
            type: "success",
            message: `Successfully ordered`
          });
          },1000)
          store.commit("setCartTotal",[])
          this.$router.push({ name: "home" });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
.maxBox .mainBox .header
 {
  margin-top: 10px;
}
.maxBox .mainBox .header .headerBox {
  display: flex;
  align-items: center;
}
.maxBox .mainBox .header .headerBox .back {
  width: 50px;
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 5px;
}
.maxBox .mainBox .header .headerBox .title {
  padding: 5px 0;
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.maxBox .mainBox .item {
  margin-top: 10px;
}
.maxBox .mainBox .item .itemBox {
  display: flex;
}
.maxBox .mainBox .item .itemBox .left {
  width: 300px;
  height: 200px;
}
.maxBox .mainBox .item .itemBox .right {
  flex: 1;
  margin: 10px;
}
.maxBox .mainBox .item .itemBox .right .title {
  margin-bottom: 10px;
}
.maxBox .mainBox .item .itemBox .right .Price {
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  color: rgb(255, 0, 0);
}
.maxBox .mainBox .item .itemBox .right .num {
  margin-top: 10px;
}
.maxBox .mainBox .total {
  float: right;
  margin-top: 20px;
}
.maxBox .mainBox .button {
  margin-top: 40px;
  width: 80%;
  display: flex;
  justify-content: center;
}
.clearfix {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
