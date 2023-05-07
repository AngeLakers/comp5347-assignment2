<template>
  <div>
  <el-form ref="loginForm" :model="loginData" :rules="loginRules" label-width="120px" class="login-form">
    <el-form-item label="Username" prop="username">
      <el-input v-model="loginData.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="loginData.password" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item>

      <el-button type="primary" @click="login" :loading="loginLoading">Login</el-button>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="registerButtonClicked">Register</el-button>
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


.login-form {
  max-width: 400px;
  margin: auto;
  margin-top: 100px;
}

</style>
