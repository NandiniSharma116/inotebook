const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");

// ROUTE - 1: Fetch all the notes using GET: api/notes/fetch
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    console.log(req.user);
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

// ROUTE - 2: Adding a Note using POST: api/notes/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = await Notes.create({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      res.send(note);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }
);


// ROUTE - 3: Updating an existing Note using PUT: api/notes/updatenote - Login required
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const {title,description,tag} = req.body;
      //Create a newnote object
    const newNote =  {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send({message: "NOT FOUND"});
    }
    if(note.user.toString() !== req.user.id){
      return res.status(401).send({message: "AUTHORIZATION DENIED"});
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json(true);
    } catch (error) {
      res.status(500).json({message: "Internal Server error"});
    }
    
  });


// ROUTE - 4: Delete an existing Note using DELETE: api/notes/deletenote - Login required
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send({message: "NOT FOUND"});
    }

    //Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send({message: "AUTHORIZATION DENIED"});
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Successfully the note has been deleted", note:note});
    } catch (error) {
      res.status(500).json({message: "Internal Server error"});
    }
  }); 

module.exports = router;
