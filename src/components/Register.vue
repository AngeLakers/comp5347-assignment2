<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="first-name">First Name:</label>
        <input type="text" id="first-name" v-model="firstName" required>
      </div>
      <div>
        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" v-model="lastName" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      // 处理注册逻辑
      console.log("First Name: " + this.firstName);
      console.log("Last Name: " + this.lastName);
      console.log("Email: " + this.email);
      console.log("Password: " + this.password);
    },
  },
};
</script>

<style scoped>
.register-container {
  width: 300px;
  margin: auto;
  text-align: center;
  border: 1px solid #ccc;
  padding: 20px;
}

.register-container h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>