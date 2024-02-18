import React, {useContext, useState} from 'react'
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
    const context = useContext(NoteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""});
  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title, note.description, "General");
    setNote({title: "", description: "", tag: ""})
  }
  const onChange = (e) => {
    setNote({
        ...note,
        [e.target.name]: e.target.value
    })
  }
  return (
    <div className="container mt-5">
      <h1>Add a Note</h1>
      <form action="">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
          value={note.title}
            type="text"
            className="form-control"
            id="title"
            name='title'
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
          value={note.tag}
            type="text"
            className="form-control"
            id="tag"
            name='tag'
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea value={note.description} name='description' className="form-control" id="description" rows="3" onChange={onChange}></textarea>
        </div>
        <button disabled={note.title.length<5||note.description.length<5?true:false} onClick={handleClick} type="submit" className="btn btn-warning text-white">
          <strong>Add Note</strong>
        </button>
      </form>
    </div>
  )
}

export default AddNote