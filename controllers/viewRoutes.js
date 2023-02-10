const router = require('express').Router();
const { Idea } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all ideas and JOIN with user data
    const data = await Idea.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ["username"],
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const ideas = data.map((idea) => idea.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      ideas,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
