import {useState, useContext} from 'react'
import noteContext from "../context/notecontext"
import ViewNote from './Viewnote';
import Confirm from './Confirm';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote,togglePin } = context;
    const { note, updateNote } = props;
    const [showView, setShowView] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card h-100" style={{ boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title me-2" style={{ fontFamily: 'Merienda'}}>{truncate(note.title,12)}</h5>
                    <i className="bi bi-eye-fill mx-2" style={{ cursor: "pointer" }} onClick={()=>{setShowView(true)}}></i>
                    <i className="bi bi-pencil-square mx-2" style={{ cursor: "pointer" }} onClick={()=>{updateNote(note)}}></i>
                    <i className="bi bi-trash3-fill mx-2" style={{ cursor: "pointer" }} onClick={()=>{setShowConfirm(true)}}></i>
                    <i className={`bi ${note.pinned ? "bi-pin-fill" : "bi-pin"} mx-2`} style={{ cursor: "pointer" }} onClick={() => togglePin(note._id, note.pinned)}></i>
                </div>
                <p className="card-text" style={{ fontFamily: 'Merienda'}}>{truncate(note.description, 20)}</p>
                <p className={`${props.darkMode? "text-light":"text-muted"}`} style={{ fontFamily: 'Merienda'}}>Created on: {formatDate(note.date)}</p>
                </div>
            </div>
            {showView && (<ViewNote note={note} onClose={() => setShowView(false)} />)}
            {showConfirm && <Confirm show={showConfirm}
                                onClose={() => setShowConfirm(false)}
                                onConfirm={() => {
                                deleteNote(note._id);
                                setShowConfirm(false);}}
                                message="Are you sure you want to delete this note?"/>}
        </div>
    )
}

export default Noteitem