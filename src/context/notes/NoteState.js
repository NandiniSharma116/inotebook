import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const defaultNotes = [];

  const [notes, setNotes] = useState(defaultNotes);

  //GET ALL Notes
  const getNotes = async() => {
    //API CALL
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjIxYjA2MmEyMDI4OGYxMjIxN2FkIn0sImlhdCI6MTcwODA3NTA1Nn0.fUuYPwsT0Y6LQ3sjV4tNX1McB0pPVjjmj9c0PjFPNu8",
      }});
    const json = await response.json();
    setNotes(json);
  };

  //ADDING A NOTE
  const addNote = async (title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjIxYjA2MmEyMDI4OGYxMjIxN2FkIn0sImlhdCI6MTcwODA3NTA1Nn0.fUuYPwsT0Y6LQ3sjV4tNX1McB0pPVjjmj9c0PjFPNu8",
      },
      body: JSON.stringify({ title, description, tag }), // Wrap parameters in an object
    });
  
    // Use await here to ensure the response body is read before moving forward
    const json = await response.json();
  
    setNotes(notes.concat(json));
  };
  
  //DELETE A NOTE
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjIxYjA2MmEyMDI4OGYxMjIxN2FkIn0sImlhdCI6MTcwODA3NTA1Nn0.fUuYPwsT0Y6LQ3sjV4tNX1McB0pPVjjmj9c0PjFPNu8",
      },
    });
  
    // Use await here to ensure the response body is read before moving forward
    const json = await response.json();
  
    console.log(json);
  
    // Logic to delete the note
    let newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };
  
  //UPDATE A NOTE
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjIxYjA2MmEyMDI4OGYxMjIxN2FkIn0sImlhdCI6MTcwODA3NTA1Nn0.fUuYPwsT0Y6LQ3sjV4tNX1McB0pPVjjmj9c0PjFPNu8",
      },
      body: JSON.stringify(title, description, tag),
    });
    const json = response.json();
    //Logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      let element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
