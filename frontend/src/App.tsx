import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Attendee from "./Pages/Attendee"
import Organizer from "./Pages/Organizer"
import RSVP from "./Pages/RSVP"
import ConfirmationRSVP from "./Pages/ConfirmationRSVP"
import Event from "./Pages/Event"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendee" element={<Attendee />} />
        <Route path="/organizer" element={<Organizer/>} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/confirmationrsvp" element={<ConfirmationRSVP />}/>
        <Route path="/event" element={<Event />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App