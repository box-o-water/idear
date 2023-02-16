const router = require('express').Router();
const { Idea, Choice, Vote } = require('../../models');
const withAuth = require('../../utils/auth');
const logger = require('../../public/js/logger');

router.put('/', withAuth, async (req, res) => {
    try {
        let choice_id = req.body.id.split("_")[1]; 
        let vote_status = req.body.status; 
        let user_id = req.session.user_id; 
        
        const choice_status = await Vote.findOne({ where: {
            choice_id: choice_id, 
            user_id: user_id, 
        }
        }); 

        console.log("Made it here"); 
        
        let current_status = 'unvoted'
        if (choice_status){
            current_status = choice_status.vote; 
        } 


        if (vote_status === current_status) {
            res.status(200).json({ message: "Already voted."})
        }

        let increment = true;
        let change_count_by = 0; 
        if (vote_status === 'upvoted' && current_status == 'unvoted'){
            change_count_by = 1; 
            increment = true; 
        } else if (vote_status === 'upvoted' && current_status == 'downvoted'){
            change_count_by = 2; 
            increment = true; 
        } else if (vote_status === 'downvoted' && current_status == 'unvoted'){
            change_count_by = 1; 
            increment = false; 
        }  else if (vote_status === 'downvoted' && current_status == 'upvoted'){
            change_count_by = 2; 
            increment = false; 
        }  else if (vote_status === 'unvoted' && current_status == 'upvoted'){
            change_count_by = 1; 
            increment = false; 
        } else if (vote_status === 'unvoted' && current_status == 'downvoted'){
            change_count_by = 1; 
            increment = true; 
        } 
  
        //input/update vote table vote status 
        if (choice_status){
            await Vote.update(
                {vote : vote_status}, 
                {where: { 
                    id: choice_status.id
                }}); 
        } else {
            const newVoteInput = await Vote.create({
                vote : vote_status,
                choice_id : choice_id, 
                user_id: user_id,
              });
        }

        //update choice table with vote count 
        if (change_count_by){
          if (increment){
              await Choice.increment('votes', { by: change_count_by, where: { id: choice_id }})
          } else {
              await Choice.decrement('votes', { by: change_count_by, where: { id: choice_id }})
          }
        }
  
      res.status(200).json({ message: "success"});
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;