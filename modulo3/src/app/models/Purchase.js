const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Purchase = mongoose.Schema({
  purchaseBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean,
    default: false
  },
  Ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  },
})

Purchase.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', Purchase)