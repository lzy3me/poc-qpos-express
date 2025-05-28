const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');

router.post('/menus', async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.status(201).json(item);
});

router.put('/menus/:id', async (req, res) => {
  const { id } = req.params;
  const item = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
  res.json(item);
});

router.delete('/menus/:id', async (req, res) => {
  const { id } = req.params;
  await MenuItem.findByIdAndDelete(id);
  res.status(204).send();
});

router.patch('/menus/:id/activate', async (req, res) => {
  const item = await MenuItem.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.isActive = !item.isActive;
  await item.save();
  res.json(item);
});

router.get('/categories', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.post('/categories', async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
});

router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
  res.json(category);
});

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.status(204).send();
});

module.exports = router;