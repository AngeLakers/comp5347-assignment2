<template>
  <div class="good" @click="handleDetail">
    <img class="image" :src="$imgUrl+item.brand+'.jpeg'" />
    <div>
      <p class="title">name: {{ item.title }}</p>
      <p class="good_price">
        <span class="price">price:{{ item.price }}</span>
        <span v-if="type == 'sellers'"> rating :{{ item.ratingSum }} </span>
        <span v-else>num:{{ item.stock }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: "sold"
    }
  },
  methods:{
    handleDetail(){
      localStorage.setItem("phoneInfo",JSON.stringify(this.item))
      this.$router.push({ name: "detail" });
    }
  }
};
</script>
<style scoped>
.good {
  width: 100%;
}
.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.good_price {
  display: flex;
}
.good_price span {
  margin-right: 20px;
}
.price {
  color: rgb(255, 0, 0);
}
img{
  width: 150px;
  height: 120px;
  margin: 0 auto;
}
</style>
