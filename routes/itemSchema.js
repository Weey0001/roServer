let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let itemSchema = new Schema(
  {
    itemType:String,
    itemShopId:String,
    itemKey:String,
    itemName:String,
    itemImg:String,
    itemImgIp:String,
    itemPrice:Number,
    itemCountry:String,
    itemCity:String,
    itemPhone:String,
    itemEmail:String,
  },
  {
    collection:'items',
    timestamps: true
  }
 ),
 Item = mongoose.model('Item',itemSchema);
 
 module.exports = Item