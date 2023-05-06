<template>
  <div>
    <el-table :data="comments" style="width: 100%">
      <el-table-column prop="reviewer" label="Reviewer"></el-table-column>
      <el-table-column prop="rating" label="Rating"></el-table-column>
      <el-table-column prop="comment" label="Comment">
        <template slot-scope="scope">
          <div v-if="scope.row.showComment">{{ scope.row.comment }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toggleComment(scope.$index)">
            {{ scope.row.showComment ? 'Hide Comment' : 'Show Comment' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      comments: [],
      sellerId: ''

    };
  },
  methods: {
    toggleComment(index) {
      this.$set(this.comments[index], 'showComment', !this.comments[index].showComment);
    },

   async fetchComments() {
      try {
        const response1 = await this.getRequest("/api/comments", null);
        let  comments = response1.data.map(review => ({
          reviewer: review.reviewer,
          rating: review.rating,
          comment: review.comment,
          hidden: review.hidden || null,
          showComment: true
        }));
        console.log(comments);
        this.comments = comments;
      } catch (error) {
        console.log(error);
        this.$message.error(error.message);
      }



    }
  },
  mounted() {
    this.fetchComments();
  }
};
</script>
