const router = require('express').Router();
const { Idea } = require('../../models');

router.post('/idea', async (req, res) => {
  try {
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
