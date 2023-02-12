const router = require('express').Router();
const { Idea, User, Choice } = require('../models');

router.put('/vote', async (req, res) => {
  try {
    console.log(req.data); 
    const data = await Choice.increment('votes', { by: 1, where: { id: 17 }})
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/', async (req, res) => {
  try {
    // Get all ideas and JOIN with user data
    const data = await Idea.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
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

router.get('/idea/:id', async (req, res) => {
  try {
    const data = await Idea.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Choice,
        }
      ],
    });

    const idea = data.get({ plain: true });

    res.render('idea', {
      ...idea,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
