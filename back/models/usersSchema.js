// // models\UsersSchema.js
// const mongoose = require('mongoose')
// const fs = require('fs');
// const path = require('path');
// const UsersSchema = mongoose.Schema({
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: Number, required: true },
// })
// const MoSchema = mongoose.model("User", UsersSchema);
// // (async () => {
// //   // 在这里使用 await
// // const data = await fs.promises.readFile(path.join(__dirname, '..', 'public', 'data', 'userlist.json'), 'utf-8');
// // const usersData=JSON.parse(data);
// // const decryptedData =  usersData.map(item => {
// //   if (item.password) {
// //     item.password ='123456';
// //     item._id=item._id.$oid
// //   }
// //   return item;
// // });
//
// //  const result = await MoSchema.find();
// //  if(!result.length){
// // console.log(decryptedData,999)
// //   await MoSchema.insertMany(decryptedData)
// //  }
// // })();
// module.exports = MoSchema