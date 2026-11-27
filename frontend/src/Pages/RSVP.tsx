//import { Link } from "react-router-dom"

function RSVP() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 text-slate-100">

      <h1 className="text-3xl font-bold mb-8">RSVP to Event</h1>

      <div className="flex flex-col md:flex-row gap-4">

        <div className="p-6 bg-[#6154a0] rounded-lg">
          <h2>Event Details</h2>
          <ul className="list-disc list-inside">
            <li>detail 1</li>
            <li>detail 2</li>
            <li>detail 3</li>
          </ul>
        </div>

        <div className="p-6 bg-[#6154a0] rounded-lg">
          <h2>Register</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Name" className="p-2 rounded bg-slate-800 text-slate-100" />
            <input type="email" placeholder="Email" className="p-2 rounded bg-slate-800 text-slate-100" />
            <input type="text" placeholder="Dietary Restrictions" className="p-2 rounded bg-slate-800 text-slate-100" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded">RSVP</button>
          </form> 
        </div>

      </div>

    </div>
  )
}

export default RSVP