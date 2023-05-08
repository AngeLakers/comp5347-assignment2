<template>
  <div>
  <el-form ref="loginForm" :model="loginData" :rules="loginRules" label-width="120px" class="login-form">
    <el-form-item label="Username" prop="username">
      <el-input v-model="loginData.username" autocomplete="off"
                size="medium"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="loginData.password" autocomplete="off" show-password
                size="medium"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login" :loading="loginLoading">Login</el-button>
    </el-form-item>



  </el-form>
    <div class="forget-password-link">
      <router-link to="/forgetPassword">Forgot your password?</router-link>
      <el-button type="primary" @click="registerButtonClicked">Register</el-button>
    </div>



  </div>
</template>
<script>
export default {
  name: "Login",

  data() {
    return{
      loginData: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, message: "Please enter your username", trigger: "blur" }],
        password: [{ required: true, message: "Please enter your password", trigger: "blur" }]
      },
      loginLoading: false
    };


  },

  methods: {
    registerButtonClicked() {
      this.$router.push("/register");
    },

    async login() {
      try {
        await this.$refs.loginForm.validate();
        this.loginLoading = true;
        const response = await this.postRequest("/api/login", this.loginData);
        const token = response.data.token;
        sessionStorage.setItem('email', this.loginData.username);
        sessionStorage.setItem("token", token);

        await this.$router.push("/userPage");
      }catch (error) {
        console.log(error);
        this.$message({
          message: "Failed to log in, please check your username and password"  ,
          type: "error",
        });
      }finally {
        this.loginLoading = false;
      }





    }
  }
};
</script>

<style scoped>

.el-input--medium {
  width: 300px; /* 设置输入框的宽度 */
}



</style>
