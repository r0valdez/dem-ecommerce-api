const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID(),
    title: 'Product A',
    price: 10,
    size: '0.5',
    color: 'black',
    quantity: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectID(),
    title: 'Product B',
    price: 20,
    size: '0.25',
    color: 'black',
    quantity: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectID(),
    title: 'Product C',
    price: 15.00,
    size: '0.35',
    color: 'red',
    quantity: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectID(),
    title: 'Product D',
    price: 15.00,
    size: '0.5',
    color: 'blue',
    quantity: 17,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
