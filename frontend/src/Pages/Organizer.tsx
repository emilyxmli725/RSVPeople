import Navbar from "./Navbar"
import { Link } from "react-router-dom"


function Organizer() {

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf5dc] text-slate-900">

      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-[#6154A0]">My Events</h1>

        <div className="flex flex-col md:flex-row gap-6">

          <div className="p-6 bg-[#6154A0] text-white rounded-lg shadow-md min-w-64">
            <h2 className="text-xl font-semibold mb-3">Manage Events</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Event 1</li>
              <li>Event 2</li>
              <li>Event 3</li>
            </ul>
          </div>

          <div className="p-6 bg-[#7D7ABC] text-white rounded-lg shadow-md min-w-64">
            <h2 className="text-xl font-semibold mb-3">Create Event!</h2>

            <Link to="/event" className="bg-[#EB9486] text-slate-900 font-semibold hover:brightness-95 p-2 rounded transition">
            Let's go!
            </Link>
          </div>

        </div>
      </main>

    </div>
  )
}

export default Organizer