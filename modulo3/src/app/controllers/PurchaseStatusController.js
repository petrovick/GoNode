const Purchase = require('../models/Purchase')
const Ad = require('../models/Ad')

class PurchaseStatusController {
  async index(req, res) {
    var purchases = await Purchase.find({})
    console.log(purchases)
    return res.json(purchases)
  }

  async accept(req, res) {
    console.log('chegou aqui')
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    var ad = await Ad.findByIdAndUpdate(req.body.ad, { purchasedBy: req.userId }, {
      new: true
    })

    return res.json(ad)
  }

}

module.exports = new PurchaseStatusController()