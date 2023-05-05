<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <button @click.prevent="registerButtonClicked">Register</button>
        <button @click.prevent="loginButtonClicked">Login</button>
        <router-link to="/forgetPassword">Forgot your password?</router-link>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",

  data() {
    return {
      username: '',
      password: ''
    }

  },

  methods: {
    registerButtonClicked() {
      this.$router.push("/register");
    },

    async loginButtonClicked() {
      const userData = {
        username: this.form.username,
        password: this.form.password,
      };

      try {
        const response = await this.postRequest("/api/login", userData);
        const {token} = response.data;
        sessionStorage.setItem("token", token);
        await this.$router.push("/");


      } catch (error) {
        console.log(error);
        this.$message({
          message: "Login failed",
          type: "error",
        });
      }


    }
  }
};
</script>

<style scoped>

.login-container {
  width: 300px;
  margin: auto;
  text-align: center;
  border: 1px solid #ccc;
  padding: 20px;
}

.login-container h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
