<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" show-password></el-input>
        </el-form-item>
        <el-button style="display:block;margin:0 auto;width:150px" type="primary" @click="save">登陆</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    async save() {
      const res = await this.$http.post(
        "http://localhost:3000/admin/api/login",
        this.model
      );
      localStorage.token = res.data.token;
      localStorage.user = this.model.name;
      this.$router.push("/");
      this.$message.success("登陆成功");
    }
  }
};
</script>
<style scoped>
.login-container {
  width: 500px;
  margin: 0 auto;
  padding: 100px;
}
</style>