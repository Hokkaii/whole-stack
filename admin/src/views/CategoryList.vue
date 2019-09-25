<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "CategoryList",
  data() {
    return {
      tableData: [],
      dialogVisible: false
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(
        "http://localhost:3000/admin/api/rest/categories"
      );
      this.tableData = res.data;
    },
    editItem(item) {
      this.$router.push(`/categories/edit/${item._id}`);
    },
    async deleteItem(item) {
      this.$confirm(`此操作将永久删除该分类${item.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(
          `http://localhost:3000/admin/api/rest/categories/${item._id}`
        );
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  }
};
</script>
<style scoped>
h1 {
  margin-bottom: 30px;
}
</style>