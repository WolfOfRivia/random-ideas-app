// To create seperate file you need to use a router
const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// also changed all instances of app.method() to router.method()

/* Keeping this in a RESTFUL structure, 
  - when we want to get ideas we make a get request to /api/ideas
  - when we want to create ideas we make a post request to /api/ideas
  - when we want to delete ideas we make a delete request to /api/ideas/${the id of the idea}
  - when we want to update ideas we make a put request to /api/ideas
*/

// We now have a working CRUD (Create, Read, Update, Delete) Api, or a full RESTFUL Api
// What's next is using a database to persist the data, because right now this all works in memory

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
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong'});
  }
});

// Delete an idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong'});
  }
});

// don't forget to export the router
module.exports = router;