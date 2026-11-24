import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Organizer from "./Pages/Organizer"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organizer" element={<Organizer/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App