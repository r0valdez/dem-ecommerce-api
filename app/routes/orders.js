const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const {
  getOrders,
  createOrder,
  getTotalPrice
} = require('../controllers/orders')

/*
 * Orders routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  getOrders
)

/*
 * Create new item route
 */
router.post(
  '/',
  trimRequest.all,
  createOrder
)

/*
 * Get total price route
 */
router.get(
  '/total-price',
  trimRequest.all,
  getTotalPrice
)

module.exports = router
