const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note= require("../models/Note");
const { body, validationResult } = require('express-validator');

//ROUTE 1 : Get ALl the Notes using : GET "/api/notes/getuser". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);    
    } catch (error) {
        console.error(error.massage)
        res.status(500).send("internal server error") 
    }
});

//ROUTE 2 : Add a new Notes using : POST "/api/notes/addnote". login required
router.post("/addnote",fetchuser,[
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Password must be atlest 5 characters").isLength({min: 5}),],async (req, res) => {
    try {
    const {title, description,tag} = req.body;
    //If there are  errors, return Bad  request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,description,tag,user: req.user.id
    })
    const saveNote = await note.save()

    res.json(saveNote);
} catch (error) {
    console.error(error.message)
    res.status(500).send("internal server errore")   
} 
  });

//ROUTE 3 : updatea existing Notes using : PUT "/api/notes/updatenote". login required
router.put("/updatenote/:id",fetchuser,async (req, res) => {
    const {title,description,tag}= req.body
    //create a newNote
    try {
        
 
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it
    let note =await Note.findById(req.params.id)
    if(!note){res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
    res.json({note})
}catch (error) {
    console.error(error.message)
    res.status(500).send("internal server errore") 
    }
})

//ROUTE 4 : Delete existing Notes using : DELETE "/api/notes/deletenote". login required
router.delete("/deletenote/:id",fetchuser,async (req, res) => {
    try {       
    // Find the note to be delete and delete it
    let note =await Note.findById(req.params.id)
    if(!note){res.status(404).send("Not Found")}

    //Allow Deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted ", note:note})
    
} catch (error) {
    console.error(error.message)
    res.status(500).send("internal server errore")  
}
})

module.exports = router;
