<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">OldPhoneDeals</router-link>
    </div>
    <div class="search">
      <el-input placeholder="Enter keywords" v-model="searchValue" class="input-with-select">
        <el-button slot="append" @click="handleSearch">search</el-button>
      </el-input>
    </div>
    <div class="cart">
      <router-link to="/checkout">
        <i class="el-icon-shopping-cart"></i>
        <span class="cart-number">{{ cartItems.length }}</span>
      </router-link>
    </div>
    <div class="account">
      <template v-if="!isAuthenticated">
        <router-link to="/login">Log in</router-link>
        <router-link to="/register">Register</router-link>
      </template>
      <template v-else>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">{{ user.name }}</span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile">
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
    <div class="filter">
      <el-select v-model="selectedBrand" placeholder="Select brand" @change="handleBrandChange">
        <el-option v-for="brand in brands" :key="brand" :label="brand" :value="brand"></el-option>
      </el-select>
      <el-slider v-if="showPriceFilter" v-model="priceRange" range :min="minPrice" :max="maxPrice" :tooltip-format="priceTooltip"></el-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage"
}
</script>

<style scoped>

</style>
