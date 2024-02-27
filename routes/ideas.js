// To create seperate file you need to use a router
const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong'});
  }
});

// get a single idea
router.get('/:id', async (req, res) => {

  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong'});
  }
});

// Add an idea by accepting post requests
router.post('/', async (req, res) => {
  const idea = new Idea ({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username
  });

  try {
    const savedIdea = await idea.save();
    res.json({ sucess: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong'});
  }
})

// Update idea
router.put('/:id', async (req, res) => {
  try {
    // The objective here is to give only the user who added the idea authorization to also UPDATE that idea
    // Get idea we are updating
    const idea = await Idea.findById(req.params.id);

    // Match the Username
    if(idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id, 
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag
          }
        },
        { new: true }
      );
      res.json({sucess: true, data: updatedIdea});
      return;
    }

    // Usernames do not match
    // 403 code is the unauthorized code, user is trying to update an idea that doesn't belong to them
    res.status(403).json({ success: false, error: 'You are not authorized to update this resource'});

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong'});
  }
});

// Delete an idea
router.delete('/:id', async (req, res) => {
  try {
    // The objective here is to give only the user who added the idea authorization to also DELETE that idea
    // Get idea we are deleting
    const idea = await Idea.findById(req.params.id);

    // Match the Username
    if(idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // Usernames do not match
    // 403 code is the unauthorized code, user is trying to delete an idea that doesn't belong to them
    res.status(403).json({ success: false, error: 'You are not authorized to delete this resource'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong'});
  }
});

// don't forget to export the router
module.exports = router;