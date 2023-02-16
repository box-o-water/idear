const router = require('express').Router();
const { Idea, Choice } = require('../../models');
const withAuth = require('../../utils/auth');
const logger = require('../../public/js/logger');

router.post('/', withAuth, async (req, res) => {
  logger.info('Attempting to create a new idea');
  //res.status(200).json(req.body); 
  try {
    const newIdea = await Idea.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    //res.status(200).json(newIdea);
    const choice1 = req.body.choice1; 
    const choice2 = req.body.choice2; 
    const choice3 = req.body.choice3; 
    const choice4 = req.body.choice4; 
    const choice5 = req.body.choice5; 
    const choices = [ choice1, choice2, choice3, choice4, choice5]; 
    for (i = 0; i<choices.length; i++){
      if (!choices[i]){
        continue; 
      }
      try { 
        const choiceInput = await Choice.create({
          name: choices[i], 
          idea_id : newIdea.id
      })
      } catch (err){
        res.status(400).json(err);
        logger.error('Could not update to choice table');
      }
     }
    res.status(200).json(newIdea);
    logger.info('A valid idea was created');
  } catch (err) {
    res.status(400).json(err);
    logger.error('A bad request was sent to the idea post route');
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  logger.info('Attempting to delete a specific idea');
  try {
    const ideaData = await Idea.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!ideaData) {
      res.status(404).json({ message: 'No idea found with this id!' });
      logger.warn('An invalid idea id was provided to be deleted');
      return;
    }

    res.status(200).json(ideaData);
    logger.info('A valid idea was deleted');
  } catch (err) {
    res.status(500).json(err);
    logger.crit('A server error occurred while attempting to delete an idea');
  }
});

module.exports = router;
