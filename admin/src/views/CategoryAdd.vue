<template>
  <div>
    <h1>{{title}}</h1>
    <el-form ref="form" :model="model" label-width="80px">
      <el-form-item label="上级分类:">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in categoryList"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称:">
        <el-input v-model="model.name"></el-input>
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
  name: "CategoryAdd",
  props: {
    id: { type: String }
  },
  data() {
    return {
      title: "",
      categoryList: [],
      model: {
        name: "",
        parent: ""
      }
    };
  },
  created() {
    this.title = this.id ? "编辑分类" : "新建分类";
    this.getCategoryList();
    this.id && this.fetch(this.id);
  },
  methods: {
    async getCategoryList() {
      const res = await this.$http.get(
        "http://localhost:3000/admin/api/rest/categories"
      );
      this.categoryList = res.data;
      console.log(this.categoryList)
    },
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(
          `http://localhost:3000/admin/api/rest/categories/${this.id}`,
          this.model
        );
      } else {
        res = await this.$http.post(
          "http://localhost:3000/admin/api/rest/categories",
          this.model
        );
      }
      this.$router.push("../../categories/list");
      this.$message.success("操作成功！");
    },
    async fetch(id) {
      const res = await this.$http.get(
        `http://localhost:3000/admin/api/rest/categories/${id}`
      );
      this.model = res.data;
    }
  }
};
</script>
<style scoped>
h1 {
  margin-bottom: 30px;
}
</style>