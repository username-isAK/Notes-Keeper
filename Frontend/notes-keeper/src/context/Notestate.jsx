import { useState } from 'react'
import Notecontext from "./notecontext"
const API_URL = import.meta.env.VITE_API_URL;

const Notestate = ({children, showAlert}) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const getAuthToken = () => localStorage.getItem("token")

  const getNotes = async () => {
    const response = await fetch(`${API_URL}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": getAuthToken()
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${API_URL}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": getAuthToken()
      },
      body: JSON.stringify({ title, description, tag })
    });
      getNotes();
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${API_URL}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": getAuthToken()
      }
    });
    try{
      const newNotes = notes.filter((note) => note._id !== id)
      showAlert("Successfully deleted the note","success")
      setNotes(newNotes)}
    catch{
      showAlert("Failed to delete note","danger")
    }
  }

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${API_URL}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": getAuthToken()
      },
      body: JSON.stringify({ title, description, tag })
    });

      let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
  }

  const togglePin = async (id, currentPinned) => {
  try {
    const response = await fetch(`${API_URL}/api/notes/pin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getAuthToken()
      },
      body: JSON.stringify({ pinned: !currentPinned })
    });

    const updatedNote = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].pinned = updatedNote.note.pinned;
        break;
      }
    }

    newNotes.sort((a, b) => b.pinned - a.pinned);
    setNotes(newNotes);
  } catch (error) {
    console.error("Failed to toggle pin:", error);
  }
};

  return (
    <Notecontext.Provider value={{ notes, addNote, getNotes, editNote, deleteNote,togglePin }}>
      {children}
    </Notecontext.Provider>
  )
}

export default Notestate