<template>
  <div>
    <el-form :model="form" label-width="80px">
      <el-form-item label="Title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNewList">Add New List</el-button>
      </el-form-item>
    </el-form>
    <div v-if="lists.length > 0">
      <h3>My Lists</h3>
      <ul>
        <li v-for="(list, index) in lists" :key="index">
          <span>{{ list.title }} ({{ list.price }})</span>
          <el-switch v-model="list.enabled" @change="toggleList(list)"></el-switch>
          <el-button type="danger" size="small" @click="removeList(index)">Remove</el-button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No lists created yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageList",
  data() {
    return {
      form: {
        title: "",
        price: ""
      },
      lists: []
    };
  },
methods: {
    async addNewList() {
      try {
        const newList = {
          title: this.form.title,
          price: this.form.price,
          enabled: true
        };
        await this.postRequest("/api/lists", newList);
        this.lists.push(newList);
        this.form.title = "";
        this.form.price = "";
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async toggleList(list) {
      try {
        await this.putRequest("/api/lists/" + list._id, list);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async removeList(index) {
      try {
        const list = this.lists[index];
        await this.deleteRequest("/api/lists/" + list._id);
        this.lists.splice(index, 1);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async loadLists() {
      try {
        const response = await this.getRequest("/api/lists");
        this.lists = response.data;
      } catch (error) {
        this.$message.error(error.message);
      }
    }
  },

}
</script>

<style scoped>

</style>
