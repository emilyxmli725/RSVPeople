import { Link } from "react-router-dom"
import { ConfettiBackground } from "./ConfettiBg"

function Home() {
  return (
    <div className="isolate min-h-screen flex flex-col items-center justify-center bg-[#6154A0] text-slate-100">
      <ConfettiBackground />
      <h1 className="text-5xl font-bold mb-8">RSVPeople</h1>

      <h2 className="text-3xl mb-5">Select User Type</h2>

      <div className="flex gap-4">

        <Link to="/organizer" className="bg-[#9BD4CB] text-2xl text-slate-600 px-18 py-5 rounded-lg">
          Organizer
        </Link>

        <Link to="/attendee" className="bg-[#9BD4CB] text-2xl text-slate-600 px-18 py-5 rounded-lg">
          Attendee
        </Link>

      </div>

    </div>
  )
}

export default Home