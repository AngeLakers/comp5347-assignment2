<template>
  <el-form :model="passwordForm" ref="passwordForm" label-width="200px ">
    <el-form-item label="Current Password" prop="currentPassword"  size="medium">
      <el-input type="password" v-model="passwordForm.currentPassword" size="medium" class="input" show-password></el-input>
    </el-form-item>
    <el-form-item label="New Password" prop="newPassword">
      <el-input type="password" v-model="passwordForm.newPassword" size="medium" class="input" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Change Password</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "ChangePassword",

  data() {
    return {
      passwordForm: {
        currentPassword: "",
        newPassword: "",
        email: null,

      },

      rules: {
        currentPassword: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            message:
              "Password must contain at least 6 characters including one uppercase letter and one number",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: 'Please input the new password', trigger: 'blur' },
          {
            pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            message:
              "Password must contain at least 6 characters including one uppercase letter and one number",
            trigger: "blur",
          },
        ]
      }
    };

  },
  mounted() {
    this.passwordForm.email = sessionStorage.getItem("email");

    this.$message({
      type: "success",
      message: "hello"
    })
    this.$message({
      type: "success",
      message: "Your email is " + this.passwordForm.email,
    });
  },

  methods: {
    submitForm() {
      this.$refs.passwordForm.validate(async (valid) => {
        if (valid) {



          this.$message({
            type: "success",
            message: "email send successfully",
          });
          if (!this.passwordForm.email) {
            const email = sessionStorage.getItem('email') || this.$route.query.email;
            this.passwordForm.email = email || '';
          }

         await this.postRequest("/api/change_password_success", this.passwordForm).then(

            (response) => {
              console.log(response);
              if (response.status === 200) {
                this.$message({
                  type: "success",
                  message: "Password updated successfully",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "Password update failed",
                });
              }
            }
          );

        } else {
          // Show error message
          this.$message({
            type: "error",
            message: "Form validation failed",
          });
          return false;
        }
      });

    }
  }
}
</script>

<style scoped>
.input {
  width: 300px;
}
</style>
