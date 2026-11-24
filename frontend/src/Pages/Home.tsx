import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100">

      <h1 className="text-3xl font-bold mb-8">RSVPeople</h1>

      <h2 className="mb-4">Select User Type</h2>

      <div className="flex gap-4">

        <Link to="/organizer" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
          Organizer
        </Link>

        <Link to="/attendee" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
          Attendee
        </Link>

      </div>

    </div>
  )
}

export default Home