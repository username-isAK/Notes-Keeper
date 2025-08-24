import { jsPDF } from "jspdf";

const Viewnote = ({ note, onClose }) => {
  if (!note) return null;
  
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(note.title || "Untitled", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const descriptionLines = doc.splitTextToSize(note.description || "No description", 170);
    doc.text(descriptionLines, 20, 35);

    let nextY = 40 + descriptionLines.length * 7;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(`Tag: ${note.tag || "None"}`, 20, nextY);
    doc.save(`${note.title || "note"}.pdf`);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
 
          <div className="modal-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#fcfaeb' }}>
            <h5 className="modal-title" style={{ fontFamily: 'cursive'}}>{note.title}</h5>
            <i
              className="bi bi-x-lg"
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              onClick={onClose}
            ></i>
          </div>

          <div className="modal-body">
            {note.description.includes("\n") ? (
              <ul style={{ fontFamily: 'cursive' }}>
                {note.description.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>))}</ul>) : (<p style={{ fontFamily: 'cursive' }}>{note.description}</p>)}
            <small className="text-muted" style={{ fontFamily: 'cursive'}}>{note.tag}</small>
            <div className="modal-footer">
            <button className="btn btn-link" onClick={exportPDF}>
              Export as PDF
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewnote;
