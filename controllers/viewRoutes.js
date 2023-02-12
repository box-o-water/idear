const router = require('express').Router();
const { request } = require('express');
const { Idea, User, Choice } = require('../models');

router.put('/vote', async (req, res) => {
  try {
    let choice_id = req.body.id.split("_")[1]; 
    if (req.body.up === "true" && req.body.down ==="0" ){
    console.log(req.data); 
    await Choice.increment('votes', { by: 1, where: { id: choice_id }})
    } else if (req.body.down === "true" && req.body.down ==="0"){
    await Choice.decrement('votes', { by: 1, where: { id: choice_id }})
    } else if (req.body.up === "false" && req.body.down ==="0"){
      await Choice.decrement('votes', { by: 1, where: { id: choice_id }})
    } else if (req.body.down === "false" && req.body.down ==="0"){
      await Choice.increment('votes', { by: 1, where: { id: choice_id }})
    }  else if (req.body.up === "false" && req.body.down ==="true"){
      await Choice.decrement('votes', { by: 2, where: { id: choice_id }})
    } 


    res.status(200).json({ message: choice_id });
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
