import Order from '../models/orderModel.js'
import asyncHandler from '../middleware/asyncHandler.js'


export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x, 
      product: x._id,
      _id: undefined
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  })

  const createOrder = await order.save()
  res.status(201).json(createOrder)
})

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})
  res.status(200).json(orders)
})

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  res.status(200).json(order)
})

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.json('updateOrderToPaid')
})

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.json('updateOrderToDelivered')
})

export const getOrders = asyncHandler(async (req, res) => {
  res.json('getOrders')
})