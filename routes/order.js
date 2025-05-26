const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

router.get('/', async (req, res) => {
  const { status } = req.query;
  const orders = await Order.find({ status: status || 'pending' }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;