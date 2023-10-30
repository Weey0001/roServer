let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let typeSchema = new Schema(
  {
    TypeItem:String,
  },
  {
    collection:'types',
    timestamps: true
  }
 ),
 TypeItem = mongoose.model('TypeItem',typeSchema);
 
 module.exports = TypeItem