import React, { useState } from "react";
import Confirm from "./Confirm";
const API_URL = import.meta.env.VITE_API_URL;

const DeleteAcc = ({ showAlert }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/deleteuser`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("Account deleted successfully!", "success");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        showAlert(data.error || "Something went wrong", "danger");
      }
    } catch (error) {
      console.error(error);
      showAlert("Server error. Try again later.", "danger");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-danger"
        onClick={() => setShowConfirm(true)}
        style={{ fontFamily: 'Merienda', fontSize: "clamp(0.8rem, 2vw, 1rem)" }}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Deleting...
          </>
        ) : (
          <>
            <i className="bi bi-person-dash-fill me-1"></i>
            Delete Account
          </>
        )}
      </button>

      <Confirm
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
};

export default DeleteAcc;
