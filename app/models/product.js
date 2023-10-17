const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

ProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', ProductSchema)
