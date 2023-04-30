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
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login "
}
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