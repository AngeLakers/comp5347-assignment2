<template>
  <div>
    <h2>Edit Profile</h2>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="First Name">
        <el-input v-model="form.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input v-model="form.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Current Password">
        <el-input v-model="currentPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate">Update Profile</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditProfile",

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",

      },
      currentPassword: "",


    };
  },
  async mounted() {
    try {

      const response = await this.getRequest("/api/users", null
      );
let user = response.data;
      this.form.firstName = user.firstname;
      this.form.lastName = user.lastname;
      this.form.email = user.email;
    } catch (error) {
      console.log(error);
      this.$message.error(error.message);
    }
  },


  methods: {

    async onUpdate() {

      try {
        // validate current password
        const response = await this.postRequest("/api/updateFile", {

          password: this.currentPassword,

        });
        if (!response.data.success) {
          throw new Error("Incorrect password");

        } else {
          this.$message({
            type: "success",
            message: "Password confirmed",
          });
        }

        // send updated data to server for saving
        const userData = {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,

        };
        console.log(userData);
        const response1 = await this.putRequest("/api/users", userData);

        if (response1.status !== 200) {
          throw new Error("Error updating profile");
        }else{
          this.$message({
            type: "success",
            message: "Profile updated successfully",
          });
        }

      } catch (error) {
        console.log(error);
        this.$message.error(error.message);
      }
    },
  },

}
</script>

<style scoped>

</style>
