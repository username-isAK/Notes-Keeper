import Notes from "./Components/Notes"
import Notestate from "./context/Notestate"
function App() {

  return (
    <Notestate>
     <Notes/>
    </Notestate>
  )
}

export default App
