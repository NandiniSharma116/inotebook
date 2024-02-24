import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const updateNote = async(currentNote) => {
     setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
    ref.current.click();
   
  };

  const handleClick = (e) => {
    console.log("Updating the note ", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.changeAlert("Updated Successfully", "warning");
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <AddNote changeAlert={props.changeAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="edescription"
                    className="form-control"
                    id="edescription"
                    rows="3"
                    onChange={onChange}
                    value={note.edescription}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                <strong>Close</strong>
              </button>
              <button disabled={note.etitle.length<5||note.edescription.length<5?true:false} onClick={handleClick} type="button" className="btn btn-warning text-white">
                <strong>Update Note</strong>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 container">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length===0&&'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem changeAlert={props.changeAlert} updateNote={updateNote} note={note} key={note.id} />;
        })}
      </div>
    </>
  );
};

export default Notes;
