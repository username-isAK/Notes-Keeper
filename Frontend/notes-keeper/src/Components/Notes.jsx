import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notecontext';
import Noteitem from './Noteitem';
import AddNote from './Addnote';

const Notes = ({showAlert}) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getNotes();
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const handleClick = () => {
    try{editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Note updated succesfully","success")}
    catch{
      showAlert("Failed to update note","danger")
    }
  };

  const filteredNotes = Array.isArray(notes)
    ? notes.filter((n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNoteModal"></button>

      <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{backgroundColor: '#fcfaeb' }}>
              <h5 className="modal-title" id="exampleModalLabel" style={{ fontFamily: 'cursive'}}>Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label" style={{ fontFamily: 'cursive'}}>Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label" style={{ fontFamily: 'cursive'}}>Description</label>
                    <textarea
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                      minLength={5}
                      required
                      rows={3}
                      style={{
                        resize: "vertical",
                        maxHeight: "10rem",
                        overflowY: "auto"
                      }}
                    ></textarea>
              </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label" style={{ fontFamily: 'cursive'}}>Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{fontFamily: "cursive",
                fontSize: "clamp(0.5rem, 2vw, 1rem)"}}>Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick} style={{fontFamily: "cursive",
                fontSize: "clamp(0.5rem, 2vw, 1rem)"}}><i class="bi bi-pen"></i>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center my-3">
        <h2 className="mt-4" style={{display:'inline-block',fontFamily: 'cursive',backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem"}}>Your Notes</h2>
        <input
            type="text"
            className="form-control"
            placeholder="Search notes by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{maxWidth: "30rem",width: "100%",display:'inline-block',fontFamily: 'cursive',backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem"}}/>
        </div>

        <div
          className="row"
          style={{fontFamily: 'cursive',backgroundColor: "rgba(255,255,255,0.7)",padding: "0.5rem 0.75rem",borderRadius: "1rem"}}>
          {filteredNotes.length === 0 && "No notes to display"}
          {filteredNotes.map((note) => (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />))}
        </div>
      </div>
    </>
  );
};

export default Notes;
