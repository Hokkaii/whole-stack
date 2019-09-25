<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="基础信息" name="first">
        <h1>{{title}}</h1>
        <el-form ref="form" :model="model" label-width="80px">
          <el-form-item label="名称:">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号:">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像:">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型:">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categoryList"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度:">
            <el-rate v-model="model.scores.difficult" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="技能:">
            <el-rate v-model="model.scores.skills" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="攻击:">
            <el-rate v-model="model.scores.attack" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="生存:">
            <el-rate v-model="model.scores.survive" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装:">
            <el-select v-model="model.luckyItems" multiple>
              <el-option v-for="item in items" :key="item._id" :value="item._id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装:">
            <el-select v-model="model.unluckyItems" multiple>
              <el-option v-for="item in items" :key="item._id" :value="item._id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="英雄技巧:">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧:">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战技巧:">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="技能信息" name="second">
        <el-button>添加技能</el-button>
        <el-row type="flex">
          <el-col :md="12">
            <el-form-item label="名称">
              <!-- <el-input></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "HerosAdd",
  props: {
    id: { type: String }
  },
  data() {
    return {
      title: "",
      itemList: [],
      categoryList: [],
      items: [],
      imageUrl: "",
      activeName: "first",
      model: {
        name: "",
        icon: "",
        title: "",
        categories: "",
        scores: {}
      }
    };
  },
  created() {
    this.title = this.id ? "编辑英雄" : "新建英雄";
    this.getItemList();
    this.fetchCategoryList();
    this.fetchItems();
    this.id && this.fetch(this.id);
  },
  methods: {
    async getItemList() {
      const res = await this.$http.get(
        "http://localhost:3000/admin/api/rest/heros"
      );
      this.itemList = res.data;
    },
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(
          `http://localhost:3000/admin/api/rest/heros/${this.id}`,
          this.model
        );
      } else {
        res = await this.$http.post(
          "http://localhost:3000/admin/api/rest/heros",
          this.model
        );
      }
      this.$router.push("../../heros/list");
      this.$message.success("操作成功！");
    },
    async fetch(id) {
      const res = await this.$http.get(
        `http://localhost:3000/admin/api/rest/heros/${id}`
      );
      this.model = { ...this.model, ...res.data };
    },
    async fetchCategoryList() {
      const res = await this.$http.get(
        `http://localhost:3000/admin/api/rest/categories`
      );
      this.categoryList = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(
        `http://localhost:3000/admin/api/rest/items`
      );
      this.items = res.data;
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