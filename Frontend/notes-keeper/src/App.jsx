import Addnote from "./Components/Addnote"
import Notestate from "./context/Notestate"
function App() {

  return (
    <Notestate>
     <Addnote/>
    </Notestate>
  )
}

export default App
