<template>
  <div>
    <h1>Forget Password</h1>
  </div>
  <form @submit.prevent="resetPassword">
    <div>
      <label>Email:</label>
      <input type="email" v-model="email">
    </div>
    <div>
      <label>New password:</label>
      <input type="password" v-model="password1">
    </div>
    <div>
      <label>Confirm new password:</label>
      <input type="password" v-model="password2">
    </div>
    <button type="submit">Reset password</button>
  </form>

</template>

<script>


export default {
  name: "Forget-password",
  data() {
    return {
      email: '',
      password1: '',
      password2: ''
    }
  },
  methods: {
    async resetPassword() {
      const userData = {
        email: this.email,
        password1: this.password1,
        password2: this.password2
      };

      try {
        const response = await this.postRequest("/reset-password-api", userData);
        //在重置密码页面中，用户需要提供有效/注册的电子邮件地址。如果提供的电子邮件地址有效（在数据库中），
        // Web 应用程序将通过电子邮件发送一个链接以重置密码。单击此链接后，它将重定向到 Web 应用程序页面，需要处理

        if (response.status === 200) {
          alert("Reset password successfully")
          await this.$router.push("/");
        }


      } catch (error) {
        console.log(error);

      }
    }
  }


}
</script>

<style scoped>

</style>
