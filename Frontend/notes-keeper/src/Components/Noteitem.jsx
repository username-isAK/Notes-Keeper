import {useState, useContext} from 'react'
import noteContext from "../context/notecontext"
import ViewNote from './Viewnote';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const [showView, setShowView] = useState(false);

    const truncate = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year} at ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title me-2">{note.title}</h5>
                        <i className="bi bi-eye-fill mx-2" style={{ cursor: "pointer" }} onClick={()=>{setShowView(true)}}></i>
                        <i className="bi bi-trash3-fill mx-2" style={{ cursor: "pointer" }} onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="bi bi-pencil-square mx-2" style={{ cursor: "pointer" }} onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{truncate(note.description, 20)}</p>
                    <p className="text-muted">Created on: {formatDate(note.date)}</p>
                </div>
            </div>
            {showView && (<ViewNote note={note} onClose={() => setShowView(false)} />)}
        </div>
    )
}

export default Noteitem