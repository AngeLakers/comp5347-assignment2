<template>
  <ul>
    <li>
      <span>OldPhoneDeals</span>
    </li>
    <li>
      <el-button @click="handleToHome" size="small" type="primary" plain>home</el-button>
    </li>
    <li>
      <el-input
        placeholder="Please enter content"
        v-model="keyword"
        size="small"
        @keyup.enter="handleSearch"
      >
        <template slot="append">
          <el-button
            size="small"
            @click="handleSearch"
            icon="el-icon-search"
            type="primary"
            plain
            @keyup.enter="handleSearch"
            >search</el-button
          >
        </template>
      </el-input>
    </li>
    <li>
      <div v-if="token">
        <span class="username">{{username}}</span>
      <el-button @click="handleLogout"  size="small" type="primary" plain>Log Out</el-button>
      </div>
      <el-button v-else @click="handleLogin"  size="small" type="primary" plain>Sign in / Sign up</el-button>
    </li>
    <li class="cart" @click="handleCart" v-if="token"><i  class="el-icon-shopping-cart-full"></i>({{ cartNum }})</li>
    <li>
      <el-button v-if="token" @click="handleProfile"  size="small" type="primary" plain>Profile</el-button>
    </li>
  </ul>
</template>
<script>
import store from "../store"
export default {
  components: {},
  data() {
    return {
      keyword: "",
      username:"",
      token:""
    };
  },
  computed:{
    cartNum(){
      return store.state.cartTotal
    }
  },
  mounted(){
  console.log(store)
   this.username= sessionStorage.getItem('email');
      this.token=  sessionStorage.getItem("token");

  },
  methods: {
    handleSearch() {
        this.$router.push({ name: "list" ,query:{
          keyword:this.keyword
        }});
    },
    handleToHome(){
        if(this.$route.name=='home') return
      this.$router.push({ name: "home" });
    },
    handleLogin(){
      this.$router.push({ name: "login" });
    },
    handleProfile(){
      if(this.$route.name=='userPage') return
      this.$router.push({ name: "userPage" });
    },
    handleCart(){
      if(this.$route.name=='cart') return
      this.$router.push({ name: "cart" });
    },
    handleLogout(){


      this.$confirm('OK to log out?', 'sign out', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          sessionStorage.clear()
          localStorage.removeItem("addList")
            this.$router.push({ name: "login" });
            this.$message({
              type: 'success',
              message: `exit successfully`
            });
        }).catch(() => {

        });
    }
  }
};
</script>
<style scoped>
ul {
  height: 100%;
  width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-input {
  width: 500px;
}
.cart {
  cursor: pointer;
}
.el-icon-shopping-cart-full {
  font-size: 20px;
}
.username{
  margin-right: 10px;
}
</style>
