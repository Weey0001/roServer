let mongoose = require("mongoose"),
Schema = mongoose.Schema;

let citySchema = new Schema(
  {
    city:String,
    countryId:String
  },
  {
    collection:'cities',
    timestamps: true
  }
),
City = mongoose.model('City',citySchema);

module.exports = City