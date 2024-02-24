import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const {note, updateNote} = props;
  return (
    <div className="card mx-3 my-3" style={{ width: "18rem" }}>
      <center>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <button onClick={()=>{updateNote(note)}} type="button" className="btn btn-warning mx-1 text-white"><strong><i className="fa-solid fa-pen-to-square"></i> Update</strong></button>
        <button onClick={()=>{deleteNote(note._id); props.changeAlert("Successfully deleted a note", "danger")}} type="button" className="btn btn-warning mx-1 text-white"><strong><i className="fa-solid fa-trash-can"></i> Delete</strong></button>
      </div>
      </center>
    </div>
  );
};

export default NoteItem;
