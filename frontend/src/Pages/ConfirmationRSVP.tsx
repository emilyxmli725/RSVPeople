import { Link } from "react-router-dom"

function ConfirmationRSVP() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbf5dc] text-slate-900">

      <h1>Registration confirmed!</h1>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 p-2 rounded">
        Back to Home
      </Link>

    </div>
  )
}

export default ConfirmationRSVP