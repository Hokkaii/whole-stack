<template>
  <div>
    <el-form label-width="80px">
      <h1>{{title}}</h1>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="基础信息" name="first">
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
              :on-success="afterUploadForHoroIcon"
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
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="second">
          <el-button @click="addSkill">添加技能</el-button>
          <el-row type="flex">
            <el-col :span="10" v-for="(item,index) in model.skills" :key="index">
              <i class="el-icon-error deleteIcon" @click="model.skills.splice(index,1)"></i>
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:3000/admin/api/upload"
                  :show-file-list="false"
                  :on-success="(res,file)=>afterUploadForSkillIcon(res,index)"
                >
                  <img v-if="item.icon" :src="model.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.descrition"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:30px;">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
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
        categories: [],
        scores: {},
        skills: []
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
    afterUploadForHoroIcon(res) {
      this.model.icon = res.url;
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    afterUploadForSkillIcon(res, index) {
      this.$set(this.model.skills[index], "icon", res.url);
    },
    addSkill() {
      this.model.skills.push({});
    }
  }
};
</script>
<style>
.el-row--flex {
  flex-wrap: wrap;
}
.el-col {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 30px;
  padding: 30px 30px 10px 10px;
  position: relative;
}
</style>
<style scoped>
h1 {
  margin-bottom: 30px;
}
.deleteIcon {
  position: absolute;
  right: -15px;
  top: -15px;
  opacity: 0.3;
  font-size: 30px;
  cursor: pointer;
  transition: 1s;
}
.deleteIcon:hover {
  opacity: 0.5;
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