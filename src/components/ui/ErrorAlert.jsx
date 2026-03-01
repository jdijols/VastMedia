export default function ErrorAlert({ message }) {
  if (!message) return null
  return (
    <div role="alert" aria-live="assertive" className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
      <span className="font-semibold">Error:</span> {message}
    </div>
  )
}
