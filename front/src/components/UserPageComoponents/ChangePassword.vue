<template>
  <el-form :model="passwordForm" ref="passwordForm" label-width="120px">
    <el-form-item label="Current Password" prop="currentPassword">
      <el-input type="password" v-model="passwordForm.currentPassword"></el-input>
    </el-form-item>
    <el-form-item label="New Password" prop="newPassword">
      <el-input type="password" v-model="passwordForm.newPassword"></el-input>
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
      },
    };
  },

  methods: {
    submitForm() {
      this.$refs.passwordForm.validate(async (valid) => {
        if (valid) {
          // Call API to update password with currentPassword and newPassword
          // Show success message
          this.$message({
            type: "success",
            message: "Password updated successfully",
          });
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

</style>
