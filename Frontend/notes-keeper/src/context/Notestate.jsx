import { useState } from 'react'
import Notecontext from "./notecontext"

const Notestate = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const getAuthToken = () => localStorage.getItem("token")

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": getAuthToken()
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": getAuthToken()
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": getAuthToken()
      }
    });

    const newNotes = notes.filter((note) => note._id !== id)
    setNotes(newNotes)
  }

  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
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
    setNotes(newNotes);
  }

  return (
    <Notecontext.Provider value={{ notes, addNote, getNotes, editNote, deleteNote }}>
      {props.children}
    </Notecontext.Provider>
  )
}

export default Notestate
