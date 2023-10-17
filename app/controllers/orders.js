const Order = require('../models/order')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getOrders = (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10000
    }

    Order.paginate(req.query, options, (err, items) => {
      if (err) {
        return res.status(422).json({
          errors: {
            message: error.message
          }
        })
      }
      return res.status(200).json(items)
    })
  } catch (error) {
    return res.status(422).json({
      errors: {
        message: error.message
      }
    })
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createOrder = (req, res) => {
  try {
    Order.findOne(
      {
        orderId: req.body.orderId
      },
      (err, item) => {
        if (err) {
          return res.status(422).json({
            errors: {
              message: error.message
            }
          })
        }

        if (item) {
          return res.status(422).json({
            errors: {
              message: 'ORDER_ALREADY_EXISTS'
            }
          })
        }


        const data = {
          ...req.body,
          price: req.body.quantity * req.body.price + 5.99
        }

        Order.create(data, (err, item) => {
          if (err) {
            throw new Error({ code: 422, message: err.message })
          }

          res.status(201).json(item)
        })
      }
    )
  } catch (error) {
    return res.status(422).json({
      errors: {
        message: error.message
      }
    })
  }
}

/**
 * Get total price of orders
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTotalPrice = (req, res) => {
  try {
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: '$price' }
        }
      }
    ], (err, results) => {
      if (err) {
        return res.status(422).json({
          errors: {
            message: error.message
          }
        })
      }

      const totalPrice = results[0].totalPrice
      res.status(200).json({ totalPrice })
    })
  } catch (error) {
    return res.status(422).json({
      errors: {
        message: error.message
      }
    })
  }
}

module.exports = {
  createOrder,
  getOrders,
  getTotalPrice
}
