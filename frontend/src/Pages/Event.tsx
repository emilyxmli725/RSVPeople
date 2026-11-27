import confetti from "canvas-confetti"
import {type SubmitEvent } from "react"
import Navbar from "./Navbar"

function Event() {

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf5dc] text-slate-900">

      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-[#6154A0]">
          Create Event
        </h1>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">

          <div className="w-full px-10 py-12 bg-[#7D7ABC] text-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6">Event Details</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full p-2 rounded bg-[#9BD4CB] text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <textarea
                placeholder="Description"
                required
                rows={4}
                className="w-full px-3 py-2 rounded bg-[#9BD4CB] text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 rounded bg-[#9BD4CB] text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="datetime-local"
                className="w-full p-2 rounded bg-[#9BD4CB] text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
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

export default Event