import { useSearchParams } from "react-router-dom"
import Navbar from "./Navbar"

function RSVP() {
  const [params] = useSearchParams()
  const code = params.get("code")

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf5dc] text-slate-900">

      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-[#6154A0]">
          RSVP to Event {code}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">

          <div className="p-6 bg-[#6154A0] text-white rounded-lg shadow-md min-w-64">
            <h2 className="text-xl font-semibold mb-3">Event Details</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>detail 1</li>
              <li>detail 2</li>
              <li>detail 3</li>
            </ul>
          </div>

          <div className="p-6 bg-[#7D7ABC] text-white rounded-lg shadow-md min-w-64">
            <h2 className="text-xl font-semibold mb-3">Register</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                required
                className="p-2 rounded bg-[#9BD4CB] text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="p-2 rounded bg-[#9BD4CB] text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="text"
                placeholder="Dietary Restrictions"
                className="p-2 rounded bg-[#9BD4CB] text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-[#EB9486] text-slate-900 font-semibold hover:brightness-95 p-2 rounded transition"
              >
                RSVP
              </button>
            </form>
          </div>

        </div>
      </main>

    </div>
  )
}

export default RSVP