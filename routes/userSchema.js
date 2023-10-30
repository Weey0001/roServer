let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let userShema = new Schema(
  {
    boutique:String,
    countryId:String,
    cityId:String,
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    pass:String
  },
  {
    collection:'users',
    timestamps: true
  }
 ),
 User = mongoose.model('User',userShema);
 
 module.exports = User