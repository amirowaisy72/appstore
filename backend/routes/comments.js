const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Comments = require('../models/Comments')

// Get comments of specific App Id
router.get('/getcomments/:id' , async (req, res)=>{
    const comments = await Comments.find({appid:req.params.id});// fetch all comments of an app
    res.json(comments);
})

// Add comment on specific app id.
router.post('/addcomment/:id' , async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }else{
        let success = false
        try{
            //store data
            const {by, name, comment} = req.body;  // de-Structure
            let comments = await Comments.create({
                appid: req.params.id,
                by:by,
                name: name,
                comment: comment
            })
            success = true
            res.send({success,comments});
        }catch(error){
            res.status(500).json({success,error:error.message});
        }
    } 
})


module.exports = router