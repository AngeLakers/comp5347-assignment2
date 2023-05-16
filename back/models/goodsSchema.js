// models\goodsSchema.js
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const GoodsSchema = mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  seller: { type: String, required: true },
  price: {  type: Number, required: true, default: 0 },
  reviews: [{
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    rating: Number,
    comment: String
  }],
})
const MoSchema = mongoose.model("phones", GoodsSchema);
(async () => {
  // 在这里使用 await
const data = await fs.promises.readFile(path.join(__dirname, '..', 'public', 'data', 'phonelisting.json'), 'utf-8');
const goodsData=JSON.parse(data);
 const result = await MoSchema.find();
 if(!result.length){
  await MoSchema.insertMany(goodsData)
 }
})();
module.exports = MoSchema