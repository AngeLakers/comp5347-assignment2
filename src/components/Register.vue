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
        <button type="submit" @click="signUp">Sign up</button>
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
    rules: {
      firstName: [
        {required: true, message: "Please enter first name", trigger: "blur"},
      ],
          lastName
    :
      [
        {required: true, message: "Please enter last name", trigger: "blur"},
      ],
          email
    :
      [
        {required: true, message: "Please enter email", trigger: "blur"},
        {type: "email", message: "Please enter a valid email", trigger: "blur"},
      ],
          password
    :
      [
        {required: true, message: "Please enter password", trigger: "blur"},
        {min: 6, message: "Password must be at least 6 characters", trigger: "blur"},
        {
          pattern: /^(?=.*[A-Z]).+$/, message: 'Password must contain at least one uppercase ' +
              'letter', trigger: 'blur'
        },
      ]


    }

  },


    methods: {
      register()
      {
        // 处理注册逻辑
        console.log("First Name: " + this.firstName);
        console.log("Last Name: " + this.lastName);
        console.log("Email: " + this.email);
        console.log("Password: " + this.password);
      },

      signUp(){
        this.$refs.registerForm.validate(async (valid) => {
          if (valid) {

            // 处理注册逻辑
            const userData = {
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              email: this.form.email,
              password: this.form.password,
            };

            const result = await this.postRequest("/signup", userData);

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




    }




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