<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Title" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Brand" prop="brand">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Image URL" prop="image">
            <el-input v-model="form.image"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Stock" prop="stock">
            <el-input-number v-model="form.stock" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Price" prop="price">
            <el-input-number v-model="form.price" :step="0.01" :controls="true" :precision="2"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="addListing"  :loading="loading">Add Listing</el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <el-table :data="listings" style="width: 100%">
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column prop="brand" label="Brand"></el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column prop="stock" label="Stock"></el-table-column>
      <el-table-column label="Status">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled" active-value="true" inactive-value="false"
                     @change="toggleListing(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteListing(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  data() {
    return {
      form: {
        title: '',
        brand: '',
        image: '',
        stock: 0,
        price: 0
      },
      rules: {
        title: [{required: true, message: 'Please enter the title', trigger: 'blur'}],
        brand: [{required: true, message: 'Please enter the brand', trigger: 'blur'}],
        image: [{required: true, message: 'Please enter the image URL', trigger: 'blur'}],
        stock: [  { required: true, message: 'Please enter the stock', trigger: 'blur' },
          { validator: this.validate, trigger: 'blur' }],
        price: [ { required: true, message: 'Please enter the stock', trigger: 'blur' },{ validator: this.validateForPrice, trigger: 'blur' }]
      },
      listings: [],
      loading: false
    };
  },



  methods: {
    addListing() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return;
        }
 const newphone = {
          title: this.form.title,
          brand: this.form.brand,
          image: this.form.image,
          stock: this.form.stock,
          price: this.form.price
        };



        try {
          this.loading = true;
          const response = await this.postRequest('/api/addlistings',newphone
          );

          if (response.status == 200) {
            this.$message({
              type: "success",
              message: "Profile updated successfully",

            });
            this.listings.push(newphone);
            this.$refs.form.resetFields();
          }else{
            this.$message({
              type: "error",
              message: "Error add a new phone",
            });
          }

          this.loading = false;
          console.log(response.status);

        } catch (error) {
          console.error(error);
        }


        ;
      });
    },
    async toggleListing(listing) {
      try {
        await axios.put(`/api/listings/${listing._id}`, {enabled: listing.enabled});
      } catch (error) {
        console.error(error);
      }
    },
    // async deleteListing(listing) {
    //   try {
    //     await axios.delete(`/api/listings/${listing._id}`);
    //     this.listings.splice(this.listings.indexOf(listing), 1);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async fetchListings() {
      try {
        const response = await this.getRequest('/api/fetchlistings');
        this.listings = response.data;
         console.log("fetch successfully");
      } catch (error) {
        console.error(error);
      }
    },
    validate(rule, value, callback) {
      if (!/^[1-9]\d*$/.test(value)) {
        callback(new Error('Please enter a integer'));
      } else {
        callback();
      }
    },
    validateForPrice(rule, value, callback) {
      if (!/^[1-9]\d*(\.\d+)?$/.test(value)) {
        callback(new Error('Please enter a correct price'));
      } else {
        callback();
      }
    },

  },
  mounted(){
    this.fetchListings();
  },


};


</script>
