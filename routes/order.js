const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

module.exports = (io) => {
  let connectionAdmin = [];

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('admin-join', (data) => {
      connectionAdmin.push(socket.id);
    });

    socket.on('disconnect', () => {
      connectionAdmin = connectionAdmin.filter(id => id !== socket.id);
      io.emit('admin-leave', socket.id);
    });
  });

  router.post('/', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    
    connectionAdmin.forEach(admin => {
      console.log('Event --> ', admin);
      io.to(admin).emit('order-created', order);
    });

    res.status(201).json(order);
  });

  router.get('/', async (req, res) => {
    const { status } = req.query;
    const orders = await Order.find({ status: status || 'pending' }).populate('items.menuItemId').sort({ createdAt: -1 });
    res.json(orders);
  });

  return router;
}