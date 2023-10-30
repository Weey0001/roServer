let mongoose = require("mongoose"),
Schema = mongoose.Schema;

let countrySchema = new Schema(
  {
    country:String,
  },
  {
    collection:'countries',
    timestamps: true
  }
),
Country = mongoose.model('Country',countrySchema);

module.exports = Country