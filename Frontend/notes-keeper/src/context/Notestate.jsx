import {useState} from 'react'
import Notecontext from "./notecontext"

const Notestate = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ZDkzY2NiZjQxZTllYzAxYzg0YjdjIn0sImlhdCI6MTc1NTI2NDQ1N30.Zs7G1wrPd74knXhj6EcOctlRRH4LA_NDEofGSqFbd1Y"
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ZDkzY2NiZjQxZTllYzAxYzg0YjdjIn0sImlhdCI6MTc1NTI2NDQ1N30.Zs7G1wrPd74knXhj6EcOctlRRH4LA_NDEofGSqFbd1Y"
      }
    });
    const json = await response.json() 
    setNotes(json)
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ZDkzY2NiZjQxZTllYzAxYzg0YjdjIn0sImlhdCI6MTc1NTI2NDQ1N30.Zs7G1wrPd74knXhj6EcOctlRRH4LA_NDEofGSqFbd1Y"
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg5ZDkzY2NiZjQxZTllYzAxYzg0YjdjIn0sImlhdCI6MTc1NTI2NDQ1N30.Zs7G1wrPd74knXhj6EcOctlRRH4LA_NDEofGSqFbd1Y"
      },
      body: JSON.stringify({title, description, tag})
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
    <div>
      <Notecontext.Provider value={{notes, addNote, getNotes, editNote, deleteNote}}>
        {props.children}
      </Notecontext.Provider>
    </div>
  )
}

export default Notestate
