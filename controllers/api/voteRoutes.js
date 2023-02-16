const router = require('express').Router();
const { Idea, Choice, Vote } = require('../../models');
const withAuth = require('../../utils/auth');
const logger = require('../../public/js/logger');

router.put('/', withAuth, async (req, res) => {
    try {
        let choice_id = req.body.id.split("_")[1]; 
        let vote_status = req.body.status; 
        let user_id = req.session.user_id; 
        
        choice_status = await Vote.findOne({ where: {
            choice_id: 1, 
            user_id: 2, 
        }
        }); 

        if (choice_status.vote){
            const current_status = choice_status.vote; 
        } else {
            const current_status = 'unvoted'; 
        }


        if (vote_status === current_status) {
            res.status(200).json({ message: "HERE WE GO"})
        }


        if (vote_status === 'upvoted' && current_status == 'unvoted'){
            let change_count_by = 1; 
            let increment = true; 
        } else if (vote_status === 'upvoted' && current_status == 'downvoted'){
            let change_count_by = 2; 
            let increment = true; 
        } else if (vote_status === 'downvoted' && current_status == 'unvoted'){
            let change_count_by = 1; 
            let increment = false; 
        }  else if (vote_status === 'downvoted' && current_status == 'upvoted'){
            let change_count_by = 2; 
            let increment = false; 
        }  else if (vote_status === 'unvoted' && current_status == 'upvoted'){
            let change_count_by = 1; 
            let increment = false; 
        } else if (vote_status === 'unvoted' && current_status == 'downvoted'){
            let change_count_by = 1; 
            let increment = true; 
        } 
  
  
      res.status(200).json({ message: "TEST"});
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;