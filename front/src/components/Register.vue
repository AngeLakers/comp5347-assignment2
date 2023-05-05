<template>
  <div class="register-container">
    <h1>Register</h1>
    <el-form :model="form" ref="form" :rules="rules" label-width="80px">
      <el-form-item label="firstName" prop="firstName">
        <el-input v-model="form.firstName"></el-input>
      </el-form-item>
      <el-form-item label="LastName" prop="lastName">
        <el-input v-model="form.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password"
                  show-password></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="passwordConfirm">
        <el-input v-model="form.passwordConfirm" type="password"
                  show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signUp">Register</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },

      rules: {
        firstName: [{ required: true, message: "First name is required", trigger: "blur" }],
        LastName: [{ required: true, message: "Last name is required", trigger: "blur" }],
        email: [
          { required: true, message: "Email is required", trigger: "blur" },
          { type: "email", message: "Invalid email format", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            message:
              "Password must contain at least 6 characters including one uppercase letter and one number",
            trigger: "blur",
          },
        ],
        passwordConfirm: [
          { required: true, message: "Please confirm your password", trigger: "blur"},
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("Passwords do not match"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },

    };
  },
  methods: {
    signUp() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const userData = {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            email: this.form.email,
            password: this.form.password,
          };

          const result = await this.postRequest("/api/signup", userData);
          if (result.status === 200) {
            this.$message({
              message: "Sign up successfully",
              type: "success",
            });
            await this.$router.push("/login");
          } else {
            this.$message({
              message: "Sign up failed",
              type: "error",
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "Sign up failed since validation failed!"
          });

          return false;
        }
      });
    }
  },
}
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
