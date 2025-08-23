import React from "react";

const Viewnote = ({ note, onClose }) => {
  if (!note) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
 
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">{note.title}</h5>
            <i
              className="bi bi-x-lg"
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              onClick={onClose}
            ></i>
          </div>

          <div className="modal-body">
            <p>{note.description}</p>
            <small className="text-muted">{note.tag}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewnote;
