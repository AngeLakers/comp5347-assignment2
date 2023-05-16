<!-- Register.vue -->
<template>
  <el-card class="box-card">
    <h2>Register</h2>
    <el-form ref="registerForm" :model="registerForm" :rules="rules" status-icon>
      <el-form-item>
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item prop="lastname">
            <el-input
              placeholder="Please enter lastname"
              v-model="registerForm.lastname"
            ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="firstname">
            <el-input
              placeholder="Please enter firstname"
              v-model="registerForm.firstname"
            ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="email">
        <div class="code">
          <el-input
          placeholder="Please input your email"
          v-model="registerForm.email"
          type="email"
        ></el-input>
        <el-button class="code-btn" @click="handleSendCode" type="primary">{{downTime*1==0?'Send code':downTime+"s"}}</el-button>
        </div>

      </el-form-item>
      <el-form-item prop="code">
        <el-input
          placeholder="Please enter verification code"
          v-model="registerForm.code"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="Please enter password"
          v-model="registerForm.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          placeholder="Please enter the confirmation password"
          v-model="registerForm.confirmPassword"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">Register</el-button>
        <el-button @click="handleLogin">To log in</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {sendCode}  from "../request/api"
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
    return {
      registerForm: {
        lastname:"",
        firstname:"",
        confirmPassword:"",
        code:"",
        email: "",
        password: ""
      },
      downTime:0,
      rules: {
        lastname: [
            { required: true, message: 'Please enter lastname', trigger: 'blur' },
          ],
          firstname: [
            { required: true, message: 'Please enter firstname',trigger: 'blur' }
          ],
          email: [
            {required: true, message: 'Please input your email', trigger: 'blur' },
            { type: 'email', message: 'Please input the correct email address', trigger: ['blur', 'change'] }
          ],
          code: [
            {required: true, message: 'Please enter verification code"', trigger: 'blur' }
          ],
          confirmPassword: [
            {required: true, message: 'Please enter the confirmation password', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            {required: true, message: 'Please enter password', trigger: 'blur' }
          ],
        }
    };
  },

  methods: {
    register() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      // 执行注册逻辑，例如发送注册请求到服务器
    },
    handleSendCode(){
      this.$refs.registerForm.validateField('email',async (vaild)=>{
        if(!vaild){
         await sendCode({
            email:this.registerForm.email
          })
          this.downTime=59
          const timer=setInterval(()=>{
            this.downTime--
            if(this.downTime<10){
              this.downTime='0'+this.downTime
            }
            if(this.downTime*1==0){
              clearInterval(timer)
            }
          },1000)
          this.$message.success("Sent successfully")
        }

      })
    },
    handleLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 600px;
  margin: 20vh auto;
}
.code{
  display: flex;
  align-items: center;
}
.code-btn{
  width: 150px;
}
</style>
