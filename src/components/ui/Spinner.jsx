export default function Spinner({ className = 'py-12', label = 'Loading' }) {
  return (
    <div className={`flex justify-center items-center ${className}`} role="status" aria-label={label}>
      <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      <span className="sr-only">{label}</span>
    </div>
  )
}
