<template>
  <div>
    <h1>{{title}}</h1>
    <el-form ref="form" :model="model" label-width="80px">
      <el-form-item label="装备名称:">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="装备图标:">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/admin/api/upload"
          :headers="getAuthorHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      itemList: [],
      imageUrl: "",
      model: {
        name: "",
        icon: ""
      }
    };
  },
  created() {
    this.title = this.id ? "编辑物品" : "新建物品";
    this.getItemList();
    this.id && this.fetch(this.id);
  },
  methods: {
    async getItemList() {
      const res = await this.$http.get(
        "http://localhost:3000/admin/api/rest/items"
      );
      this.itemList = res.data;
      console.log(this.itemList);
    },
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(
          `http://localhost:3000/admin/api/rest/items/${this.id}`,
          this.model
        );
      } else {
        res = await this.$http.post(
          "http://localhost:3000/admin/api/rest/items",
          this.model
        );
      }
      this.$router.push("../../items/list");
      this.$message.success("操作成功！");
    },
    async fetch(id) {
      const res = await this.$http.get(
        `http://localhost:3000/admin/api/rest/items/${id}`
      );
      this.model = res.data;
    },
    afterUpload(res, file) {
      console.log(res);
      this.model.icon = res.url;
      // this.imageUrl = URL.createObjectURL(file.raw);
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