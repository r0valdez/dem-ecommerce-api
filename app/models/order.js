const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const OrderSchema = new mongoose.Schema(
  {
    productTitle: {
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
    },
    status: {
      type: String,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

OrderSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Order', OrderSchema)
