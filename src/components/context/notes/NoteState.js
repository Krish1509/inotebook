import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

// get  all Notes
const getNotes = async ()=> {
  // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }
    });
    const json =  await response.json();
    setNotes(json)
  } 

    // Add a Notes
    const addNote = async (title , description, tag)=> {
    // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}), 
      });
      //TODO API call:
      const note = await response.json()
      setNotes(notes.concat(note))
    } 
   // Delete a note
   const deleteNote = async (_id) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== _id })
    setNotes(newNotes);
  }
    // Edit a Notes
    const editNote = async (id, title, description, tag)=> {
      //TODO API call:
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const json = await response.json();
      console.log(json)
        
      let newNote = JSON.parse(JSON.stringify(notes))
      //logic to edit in client
      for (let index = 0; index < notes.length; index++) {
          const element = newNote[index];
          if (element._id === id ){
            newNote[index].title = title
            newNote[index].description = description
            newNote[index].tag = tag
          break;
          }
        }
        setNotes(newNote)
    } 
  return(
        <NoteContext.Provider value={{setNotes, notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState