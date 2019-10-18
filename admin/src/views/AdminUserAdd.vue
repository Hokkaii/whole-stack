<template>
  <div>
    <h1>{{title}}</h1>
    <el-form ref="form" :model="model" label-width="120px">
      <el-form-item label="管理员名称:">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码:">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "ItemsAdd",
  props: {
    id: { type: String }
  },
  data() {
    return {
      title: "",
      model: {
        name: "",
        password: ""
      }
    };
  },
  created() {
    this.title = this.id ? "编辑管理员" : "新建管理员";
    this.id && this.fetch(this.id);
  },
  methods: {
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(
          `http://localhost:3000/admin/api/rest/admin_users/${this.id}`,
          this.model
        );
      } else {
        res = await this.$http.post(
          "http://localhost:3000/admin/api/rest/admin_users",
          this.model
        );
      }
      this.$router.push("../../admin_users/list");
      this.$message.success("操作成功！");
    },
    async fetch(id) {
      const res = await this.$http.get(
        `http://localhost:3000/admin/api/rest/admin_users/${id}`
      );
      this.model = res.data;
    }
  }
};
</script>
<style>
h1 {
  margin-bottom: 30px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>