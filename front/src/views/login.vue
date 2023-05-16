<!-- Login.vue -->
<template>
  <el-card class="box-card">
    <h2>Login</h2>
    <el-form ref="loginForm" :model="loginForm" label-width="80px">
      <el-form-item >
        <el-input placeholder="Please input your email" v-model="loginForm.email" type="email"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input  placeholder="Please enter password" v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
        <el-button @click="handleRegister">To register</el-button>
      </el-form-item>
    </el-form>
    </el-card>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      // 执行登录逻辑，例如发送登录请求到服务器
      console.log('登录成功');
    },
    handleRegister(){
      this.$router.push({ name: "register" });
    }
  }
}
</script>
<style scoped>
.box-card{
  width: 600px;
  margin: 20vh auto;
}
</style>
