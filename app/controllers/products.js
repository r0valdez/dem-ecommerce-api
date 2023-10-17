const Product = require('../models/product')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProducts = (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10000
    }
    if (req.query.sort) {
      options.sort = { [req.query.sort]: 1 }
    }
    let query = {}
    if (req.query.search) {
      const search = req.query.search
      query = {
        title: { $regex: new RegExp(search, 'i') }
      }
    }

    Product.paginate(query, options, (err, items) => {
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
const createProduct = (req, res) => {
  try {
    Product.findOne(
      {
        title: req.body.title
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
              message: 'PRODUCT_ALREADY_EXISTS'
            }
          })
        }

        Product.create(req.body, (err, item) => {
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
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProduct = (req, res) => {
  try {
    Product.findById(req.params.id, async (err, item) => {
      if (err) {
        return res.status(422).json({
          errors: {
            message: err.message
          }
        })
      }

      if (!item) {
        return res.status(404).json({
          errors: {
            message: 'Item Not Found'
          }
        })
      }

      res.status(200).json(item)
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
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProduct = (req, res) => {
  try {
    Product.findOne(
      {
        title: req.body.title,
        _id: {
          $ne: req.params.id
        }
      },
      (err, item) => {
        if (err) {
          return res.status(422).json({
            errors: {
              message: err.message
            }
          })
        }

        if (item) {
          return res.status(422).json({
            errors: {
              message: 'PRODUCT_ALREADY_EXISTS'
            }
          })
        }

        Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          },
          (err, item) => {
            if (err) {
              return res.status(422).json({
                errors: {
                  message: err.message
                }
              })
            }

            if (!item) {
              return res.status(404).json({
                errors: {
                  message: 'Item Not Found'
                }
              })
            }

            res.status(200).json(item)
          }
        )
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
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteProduct = (req, res) => {
  try {
    Product.findByIdAndRemove(req.params.id, (err, item) => {
      if (err) {
        return res.status(422).json({
          errors: {
            message: err.message
          }
        })
      }

      if (!item) {
        return res.status(404).json({
          errors: {
            message: 'Item Not Found'
          }
        })
      }

      res.status(200).json({ message: 'DELETED' })
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
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
}
