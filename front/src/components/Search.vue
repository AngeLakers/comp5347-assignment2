<template>
  <div class="about">
    <div class="maxBox">
      <div class="mainBox">
        <div class="headerBox">
          <div class="header w">
            <div>OldPhoneDeals</div>
            <div class="homeBtn">
              <a href="../home/home.html">home</a>
            </div>
            <el-input placeholder="Enter the content..." v-model="searchValue" class="input-with-select">
              <el-button slot="append">search</el-button>
            </el-input>

            <div class="SignIn">
              Sign in / Sign up
            </div>

            <div @click="handleShopping">
              <i class="el-icon-shopping-cart-2"></i>
              <!-- ({{ sessionStorage.getItem('total') || 0 }}) -->
              ({{ 0 }})
            </div>
          </div>
        </div>
        <div class="title">
          Apple
        </div>

        <!-- content -->
        <div class="contentBox">
          <div class="contentMain w">
            <el-card class="box-card">
              <div class="box">
                <div class="left">
<!--                  <img src=../dataset_dev/phone_default_images/Apple.jpeg alt="">-->
                </div>
                <div class="right">
                  <div class="nameBox">
                    <div>Title: {{ obj.title }}</div>
                    <div>Brand: {{ obj.brand }}</div>
                    <div>Available stocl: {{ obj.stock }}</div>
                    <div>Seller's name:{{ obj.seller }}</div>
                  </div>
                  <div class="PriceBox">
                    <div>Price: {{ obj.price }}</div>
                    <div>Add to the card:
                      <el-button type="text" @click="dialogVisible = true">add</el-button>
                    </div>
                  </div>
                </div>
              </div>



              <el-collapse v-model="activeNames" style="width:90%;margin: 20px auto;" @change="handleChange">
                <el-collapse-item title="Rating :" name="1">
                  <template slot="title">
                    Rating: <span>{{ flag }}</span>
                  </template>
                  <div class="collapse-item-Box" v-for="(item, index) in obj.reviews " :key=index>
                    <div>Reviewer name: {{ item.reviewer }}</div>
                    <div>Rating: {{ item.rating }}</div>
                    <div>Comment(within 200 characters): {{ item.comment }}</div>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <!-- <div class="RatingBox">
                                <div class="RatingTitle">
                                    <h3>Rating</h3>
                                </div>
                                <div v-for="item in obj.reviews">
                                    <div>Reviewer name: {{item.reviewer}}</div>
                                    <div>Rating: {{item.rating}}</div>
                                    <div>Comment(within 200 characters): {{item.comment}}</div>
                                </div>
                            </div> -->
            </el-card>
          </div>
        </div>


        <el-dialog title="tips" :visible.sync="dialogVisible" width="30%">
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="Add a num">
                <el-input v-model="form.num"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleClickSubmit">Confirm</el-button>
          </span>
        </el-dialog>

      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      total: 0,
      SoldList: [],// 5 least in stock
      BestList: [],// top five
      searchValue: '',
      searchList: [],
      list: [],
      obj: {},
      activeNames: ['1'],
      flag: '隐藏',
      dialogVisible: false,
      form: {
        num: 0
      },
      addList: [] // ++
  },
  mounted() {
    this.getList()
  },

  methods: {
    handleClickSubmit() {
      // if (sessionStorage.getItem('addList')) {
      //   this.addList = JSON.parse(sessionStorage.getItem('addList') || [])
      // }
      // this.total = Number(this.total) + Number(this.form.num)
      // sessionStorage.setItem('total', this.total) // total num
      // this.dialogVisible = false
      // this.obj.num = this.form.num // each num
      // this.addList.push(this.obj)
      // sessionStorage.setItem('addList', JSON.stringify(this.addList))
      // console.log(this.addList)
    },
    getList() {
      // this.obj = JSON.parse(sessionStorage.getItem('data') || {}) // get the value
      // this.total = JSON.parse(sessionStorage.getItem('total') || '')
    },
    handleChange() {
      // if (this.activeNames[0] == '1') {
      //   this.flag = 'Hide'
      // } else {
      //   this.flag = 'Display'
      // }
    },
    handleShopping() {
      // window.location.href = '../shopping/index.html'
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.w {
  width: 1200px;
  margin: 0 auto;
}

img {
  width: 100%;
  height: 100%;
}

.maxBox {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.maxBox .mainBox .headerBox {
  height: 70px;
  display: flex;
}

.maxBox .mainBox .headerBox .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.maxBox .mainBox .headerBox .header .homeBtn {
  border: 1px solid #ccc;
  font-size: 14px;
  padding: 5px;
}

.maxBox .mainBox .headerBox .header .el-input-group {
  width: 50%;
}

.maxBox .mainBox .headerBox .header .SignIn {
  border: 1px solid #ccc;
  font-size: 14px;
  padding: 5px;
}

.maxBox .mainBox .title {
  height: 50px;
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maxBox .mainBox .contentBox {
  margin-top: 10px;
}

.maxBox .mainBox .contentBox .contentMain .box {
  display: flex;
}

.maxBox .mainBox .contentBox .contentMain .box .left {
  width: 300px;
  height: 200px;
}

.maxBox .mainBox .contentBox .contentMain .box .right {
  width: 70%;
}

.maxBox .mainBox .contentBox .contentMain .box .right .nameBox {
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 15px 0;
}

.maxBox .mainBox .contentBox .contentMain .box .right .nameBox div {
  padding: 5px 0;
}

.maxBox .mainBox .contentBox .contentMain .RatingBox {
  width: 90%;
  margin: 20px auto;
}

.maxBox .mainBox .contentBox .contentMain .RatingBox div {
  padding: 5px 0;
}

.maxBox .mainBox .contentBox .contentMain .RatingBox .RatingTitle {
  border-bottom: 1px solid #000;
}

.el-collapse-item__content .collapse-item-Box {
  border-bottom: 1px solid #ccc;
}

.el-collapse-item__header {
  justify-content: space-between !important;
}

.el-icon-arrow-right:before {
  content: '' !important;
  display: none !important;
}

.el-collapse-item__arrow,
.el-icon-arrow-right,
.el-icon-arrow-right {
  display: none !important;
}
</style>
