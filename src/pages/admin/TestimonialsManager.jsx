import { useState } from 'react'
import { Plus, ChevronUp, ChevronDown, Pencil, Trash2, Star } from 'lucide-react'
import { useEditor } from '../../hooks/useEditor'
import SaveBar from '../../components/admin/SaveBar'

function TestimonialForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState({ ...item })
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  return (
    <div className="bg-brand-50 rounded-xl p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label">Client Name</label>
          <input
            className="admin-input"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Jane D."
          />
        </div>
        <div>
          <label className="admin-label">Role / Company</label>
          <input
            className="admin-input"
            value={form.role}
            onChange={(e) => set('role', e.target.value)}
            placeholder="e.g. Compass Real Estate"
          />
        </div>
      </div>

      <div>
        <label className="admin-label">Testimonial Text</label>
        <textarea
          className="admin-input min-h-[100px]"
          value={form.text}
          onChange={(e) => set('text', e.target.value)}
          placeholder="What did the client say?"
        />
      </div>

      <div>
        <label className="admin-label">Stars</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => set('stars', n)}
              className="cursor-pointer p-1"
            >
              <Star
                size={20}
                className={
                  n <= form.stars
                    ? 'fill-brand-500 text-brand-500'
                    : 'text-brand-200'
                }
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="admin-btn-primary">
          {item.id ? 'Update' : 'Add Testimonial'}
        </button>
        <button onClick={onCancel} className="admin-btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default function TestimonialsManager() {
  const { data, loading, saving, saved, error, dirty, update, save, undo } =
    useEditor('testimonials')
  const [editingId, setEditingId] = useState(null)
  const [adding, setAdding] = useState(false)

  if (loading || !data) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    )
  }

  const items = data || []

  function moveItem(index, direction) {
    const next = [...items]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    update(next)
  }

  function deleteItem(id) {
    if (!confirm('Delete this testimonial?')) return
    update(items.filter((it) => it.id !== id))
  }

  function saveItem(form) {
    if (form.id && items.find((it) => it.id === form.id)) {
      update(items.map((it) => (it.id === form.id ? form : it)))
    } else {
      const newItem = { ...form, id: `test-${Date.now()}` }
      update([...items, newItem])
    }
    setEditingId(null)
    setAdding(false)
  }

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-brand-950">
          Testimonials
        </h1>
        <p className="text-brand-500 mt-2">
          Manage client testimonials displayed on the home page.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <SaveBar onSave={save} onUndo={undo} saving={saving} saved={saved} dirty={dirty} />
        <button
          onClick={() => {
            setAdding(true)
            setEditingId(null)
          }}
          className="admin-btn-primary"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      {adding && (
        <div className="mb-6">
          <TestimonialForm
            item={{ name: '', role: '', text: '', stars: 5 }}
            onSave={saveItem}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, i) =>
          editingId === item.id ? (
            <TestimonialForm
              key={item.id}
              item={item}
              onSave={saveItem}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white rounded-xl border border-brand-100 p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-brand-950">{item.name}</p>
                  <span className="text-xs text-brand-400">{item.role}</span>
                </div>
                <p className="text-sm text-brand-500 line-clamp-2">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: item.stars || 0 }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className="fill-brand-500 text-brand-500"
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => moveItem(i, -1)} disabled={i === 0} className="admin-icon-btn" title="Move up">
                  <ChevronUp size={16} />
                </button>
                <button onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} className="admin-icon-btn" title="Move down">
                  <ChevronDown size={16} />
                </button>
                <button onClick={() => { setEditingId(item.id); setAdding(false) }} className="admin-icon-btn" title="Edit">
                  <Pencil size={16} />
                </button>
                <button onClick={() => deleteItem(item.id)} className="admin-icon-btn text-red-500 hover:bg-red-50" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {items.length === 0 && !adding && (
        <div className="text-center py-12 text-brand-400">
          <p>No testimonials yet. Click &ldquo;Add Testimonial&rdquo; to create one.</p>
        </div>
      )}
    </div>
  )
}
