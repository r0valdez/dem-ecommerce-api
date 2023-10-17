const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products')

/*
 * Products routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  getProducts
)

/*
 * Create new item route
 */
router.post(
  '/',
  trimRequest.all,
  createProduct
)

/*
 * Get item route
 */
router.get(
  '/:id',
  trimRequest.all,
  getProduct
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  trimRequest.all,
  updateProduct
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  trimRequest.all,
  deleteProduct
)

module.exports = router
