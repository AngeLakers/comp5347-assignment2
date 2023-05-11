<template>
  <div>
    <h1>ActiveAccount</h1>
  </div>
</template>

<script>
export default {
  name: "ActiveAccount",
  data() {
    return {

    };
  },
  mounted() {
    console.log("mounted");
    this.$message({
      message: "Verify your email address "+this.$route.query.email,
      type: "success",
    });

    this.postRequest("/api/account/active", {
      email: this.$route.query.email,
    }).then(
      (response) => {
        console.log(response);
        this.$message({
          message: "Account activated",
          type: "success",
        });
        this.$router.push("/login");
      },
      (error) => {
        console.log(error);
        this.$message({
          message: "Failed to activate account",
          type: "error",
        });
      }
    );
  },

}
</script>

<style scoped>

</style>
