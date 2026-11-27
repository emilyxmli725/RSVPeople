import { Link } from "react-router-dom"

//import { NavLink } from "react-router-dom"
/*const links = [
  { to: "/", label: "Log in" },
  { to: "/attendee", label: "Attendee" },
  { to: "/organizer", label: "Organizer" },
]
  
{links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#9BD4CB]"
                    : "hover:text-[#9BD4CB] transition-colors"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
*/

function Navbar() {
  return (
    <nav className="bg-[#6154A0] text-white shadow-md">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          RSVPeople
        </Link>

        <ul className="flex items-center gap-6 text-sm font-medium">
          
          <li>
            <Link
              to="/"
              className="bg-[#EB9486] text-slate-900 px-4 py-2 rounded-lg hover:brightness-95 transition"
            >
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar