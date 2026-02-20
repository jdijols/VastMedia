import { Check, Loader2, RotateCcw } from 'lucide-react'

export default function SaveBar({ onSave, onReset, saving, saved, dirty }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={onSave}
        disabled={saving || !dirty}
        className="inline-flex items-center gap-2 bg-brand-950 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {saving ? (
          <Loader2 size={16} className="animate-spin" />
        ) : saved ? (
          <Check size={16} />
        ) : null}
        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
      </button>

      {onReset && (
        <button
          onClick={onReset}
          disabled={saving}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 px-4 py-2.5 rounded-xl border border-brand-200 hover:bg-brand-100 disabled:opacity-50 transition-colors cursor-pointer"
        >
          <RotateCcw size={14} />
          Reset to Defaults
        </button>
      )}
    </div>
  )
}
