const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const words = await Word.find({});
  res.send(words);
});