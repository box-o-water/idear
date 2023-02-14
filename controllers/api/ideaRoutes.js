const router = require('express').Router();
const { Idea } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newIdea = await Idea.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newIdea);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
