const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
  const menu = await MenuItem.find().populate('category');
  res.json(menu);
});

module.exports = router;