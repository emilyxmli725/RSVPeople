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

        <div className="flex flex-col md:flex-row md:items-stretch gap-6 w-full max-w-6xl">

          <div className="flex-1 p-6 bg-[#6154A0] text-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Event Details</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>detail 1</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra dui eu ante porttitor, nec finibus lacus semper. 
                Morbi sed mi sodales, aliquam nibh ut, semper mauris. Integer faucibus consequat leo. 
                In at felis fringilla erat condimentum volutpat. Proin eu turpis rhoncus, ullamcorper mauris non, tempus odio. 
                Etiam ac ornare metus. Praesent auctor scelerisque mauris, accumsan maximus lorem facilisis quis. 
                Donec euismod, ipsum sit amet hendrerit posuere, quam est porta urna, sit amet malesuada nisi sapien non elit. 
                Integer interdum diam neque, ac porttitor sem gravida at. Phasellus et enim dapibus, interdum urna sed, rhoncus metus. 
                Suspendisse vehicula, lectus vitae pretium cursus, arcu nisl placerat dolor, ac rhoncus ante enim sit amet orci. Proin sodales consectetur condimentum. </li>
              <li>detail 3</li>
              <li>detail 4</li>
            </ul>
          </div>

          <div className="p-6 bg-[#7D7ABC] text-white rounded-lg shadow-md md:w-80 md:shrink-0">
            <h2 className="text-xl font-semibold mb-3">Register</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                required
                className="p-2 rounded bg-[#9BD4CB] text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="text"
                placeholder="Contact (as preferred)"
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