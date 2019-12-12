const mongoose = require("mongoose");

const fashionSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  quantity: {
    type: Number,
    require: false
  },
  price: {
    type: Number,
    require: false
  }
});

module.exports = mongoose.model("Fashion", fashionSchema);
