import { useEffect, useState, FormEvent } from 'react'

export interface RsvpEntry {
  id: number
  name: string
  email: string
  status: 'Attending' | 'Maybe' | 'Declined'
  guestsCount: number
  dietaryNotes?: string | null
  createdAt: string
}

export default function App() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'Attending' | 'Maybe' | 'Declined'>('Attending')
  const [guestsCount, setGuestsCount] = useState(1)
  const [dietaryNotes, setDietaryNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchRsvps = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/rsvps')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setRsvps(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load RSVPs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRsvps()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    try {
      setSubmitting(true)
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          status,
          guestsCount: status === 'Declined' ? 0 : Number(guestsCount),
          dietaryNotes: dietaryNotes.trim() || null,
        }),
      })
      if (!res.ok) throw new Error('Failed to create RSVP')
      const created: RsvpEntry = await res.json()
      setRsvps((prev) => [created, ...prev])
      setName('')
      setEmail('')
      setStatus('Attending')
      setGuestsCount(1)
      setDietaryNotes('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit RSVP')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/rsvps/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete RSVP')
      setRsvps((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  const totalAttending = rsvps
    .filter((r) => r.status === 'Attending')
    .reduce((sum, r) => sum + r.guestsCount, 0)

  const statusBadge = (s: RsvpEntry['status']) => {
    switch (s) {
      case 'Attending':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      case 'Maybe':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      case 'Declined':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              RSVPeople
            </h1>
            <p className="text-sm text-slate-400">
              .NET 10 Web API + Entity Framework Core (SQLite) + React &amp; Tailwind CSS
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2">
              <span className="text-slate-400">Total Responses:</span>{' '}
              <span className="font-semibold text-white">{rsvps.length}</span>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
              <span className="text-emerald-300">Confirmed Guests:</span>{' '}
              <span className="font-semibold text-emerald-200">{totalAttending}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-12">
        {/* Form column */}
        <section className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <h2 className="mb-1 text-lg font-semibold text-white">Add Guest RSVP</h2>
            <p className="mb-6 text-sm text-slate-400">
              Record a new response directly into the SQL database.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sam Taylor"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sam@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as 'Attending' | 'Maybe' | 'Declined')
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Attending">Attending</option>
                    <option value="Maybe">Maybe</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">
                    Guests Count
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    disabled={status === 'Declined'}
                    value={status === 'Declined' ? 0 : guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white disabled:opacity-50 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Dietary / Notes (optional)
                </label>
                <input
                  type="text"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="Gluten-free, vegan, allergies..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Submit RSVP'}
              </button>
            </form>
          </div>
        </section>

        {/* Guest list column */}
        <section className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Guest List</h2>
                <p className="text-sm text-slate-400">
                  Live records fetched from <code className="text-indigo-400">/api/rsvps</code>
                </p>
              </div>
              <button
                onClick={fetchRsvps}
                className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Refresh
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
                Error: {error}. Make sure the .NET backend is running on port 5141.
              </div>
            )}

            {loading ? (
              <div className="py-12 text-center text-sm text-slate-400">
                Loading RSVPs...
              </div>
            ) : rsvps.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">
                No RSVPs yet. Add the first guest using the form!
              </div>
            ) : (
              <div className="space-y-3">
                {rsvps.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-slate-700"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-medium text-white">{rsvp.name}</span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadge(
                            rsvp.status,
                          )}`}
                        >
                          {rsvp.status}
                        </span>
                        {rsvp.status !== 'Declined' && (
                          <span className="text-xs text-slate-400">
                            ({rsvp.guestsCount}{' '}
                            {rsvp.guestsCount === 1 ? 'guest' : 'guests'})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{rsvp.email}</p>
                      {rsvp.dietaryNotes && (
                        <p className="text-xs text-slate-300">
                          Note: <span className="text-slate-400">{rsvp.dietaryNotes}</span>
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(rsvp.id)}
                      className="cursor-pointer rounded-lg px-2.5 py-1.5 text-xs text-slate-400 transition hover:bg-rose-500/15 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
