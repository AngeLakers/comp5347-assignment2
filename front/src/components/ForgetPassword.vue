<template>

    <div class="forgot-password">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="forgot-password-form">
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">Reset Password</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>


export default {
  name: "Forget-password",
  data() {
    return {
      form: {
        email: "",
      },
      rules: {
        email: [
          { required: true, message: "Please enter your email address", trigger: "blur" },
          { type: "email", message: "Please enter a valid email address", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async submitForm() {
      const form = {
        email: this.form.email,
      };

      this.$refs.form.validate((valid) => {
        if (valid) {

          // Call API to reset password and show success message
          this.$message({
            type: "success",
            message: "An email has been sent to your account with instructions to reset your password",
          });
        } else {
          // Show error message for invalid form input
          this.$message({
            type: "error",
            message: "Please fix the form errors before submitting",
          });
        }
      });

      // try {
      //   const response = await this.postRequest("/reset-password-api", form);
      //   //在重置密码页面中，用户需要提供有效/注册的电子邮件地址。如果提供的电子邮件地址有效（在数据库中），
      //   // Web 应用程序将通过电子邮件发送一个链接以重置密码。单击此链接后，它将重定向到 Web 应用程序页面，需要处理
      //
      //   if (response.status === 200) {
      //     alert("Reset password successfully")
      //     await this.$router.push("/");
      //   }
      //
      //
      // } catch (error) {
      //   console.log(error);
      //
      // }
    }
  }


}
</script>

<style scoped>
.forgot-password {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.forgot-password-form {
  width: 400px;
}
</style>
