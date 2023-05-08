<template>
  <div>
    <h2>Reset Password</h2>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="New Password" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetPassword">Reset Password</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "resetPassword  ",
  data() {
   ;
    return {
      form: {
        newPassword: '',
        confirmPassword: '',
        email: null,
      },

      rules: {
        confirmPassword: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            message:
              "Password must contain at least 6 characters including one uppercase letter and one number",
            trigger: "blur",
          },
          { validator: this.validatePasswordConfirmation, trigger: "blur" }
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


    }



  },
  mounted() {
    this.form.email =  this.$route.query.email;
  },
  methods: {
    resetPassword() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {

          await this.postRequest("/api/change_password_success", {
              email: this.form.email,
              newPassword: this.form.newPassword,
            }) .then(

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
          ).catch((error) => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    validatePasswordConfirmation(rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error("Passwords do not match"));
      } else {
        callback();
      }
    }



  },




}
</script>

<style scoped>

</style>
