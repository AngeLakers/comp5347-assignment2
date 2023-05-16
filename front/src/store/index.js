import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let list = localStorage.getItem("addList");
if (list) {
  list = JSON.parse(list);
} else {
  list = [];
}
let num = 0;
list.forEach(v => {
  num += v.num * 1;
});
const store = new Vuex.Store({
  state: {
    cartTotal: num,
    // your application state goes here
    token: localStorage.getItem("goods_token")
  },
  mutations: {
    setCartTotal(state, data) {
      let num = 0;
      data.forEach(v => {
        num += v.num * 1;
      });
      state.cartTotal = num;
    }
    // your mutations go here
  },
  actions: {
    // your actions go here
  },
  getters: {
    // your getters go here
  }
});

export default store;
