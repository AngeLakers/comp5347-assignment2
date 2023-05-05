<template>
  <div>
    <el-table :data="comments" style="width: 100%">
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column label="Comment" prop="comment"></el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
      layout="prev, pager, next"
      :current-page="currentPage"
    />
  </div>
</template>

<script>
export default {
  name: "ViewComments",
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
      this.$emit("page-change", currentPage);
    },
  },
}
</script>

<style scoped>

</style>
