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
  return (
    <div>
      <Notecontext.Provider value={{addNote}}>
        {props.children}
      </Notecontext.Provider>
    </div>
  )
}

export default Notestate
