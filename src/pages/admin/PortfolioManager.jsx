import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useEditor } from '../../hooks/useEditor'
import SaveBar from '../../components/admin/SaveBar'
import MediaUploader from '../../components/admin/MediaUploader'
import SortableList from '../../components/admin/SortableList'

const CATEGORIES = [
  { key: 'portfolio-real-estate', label: 'Real Estate' },
  { key: 'portfolio-videography', label: 'Videography' },
  { key: 'portfolio-events', label: 'Events' },
  { key: 'portfolio-portraits', label: 'Portraits' },
]

function ItemForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState({ ...item })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  return (
    <div className="bg-brand-50 rounded-xl p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label">Title</label>
          <input
            className="admin-input"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Item title"
          />
        </div>
        <div>
          <label className="admin-label">Subtitle</label>
          <input
            className="admin-input"
            value={form.subtitle}
            onChange={(e) => set('subtitle', e.target.value)}
            placeholder="Item subtitle"
          />
        </div>
      </div>

      <div>
        <label className="admin-label">Media</label>
        <MediaUploader
          value={form.src}
          onChange={(url) => {
            set('src', url)
            if (url && /\.(mp4|webm|mov)/i.test(url)) {
              set('type', 'video')
            } else if (url) {
              set('type', 'image')
            }
          }}
        />
      </div>

      <div>
        <label className="admin-label">Type</label>
        <select
          className="admin-input"
          value={form.type}
          onChange={(e) => set('type', e.target.value)}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onSave(form)}
          className="admin-btn-primary"
        >
          {item.id ? 'Update' : 'Add Item'}
        </button>
        <button onClick={onCancel} className="admin-btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  )
}

function CategoryEditor({ sectionKey }) {
  const { data, loading, saving, saved, error, dirty, update, save, undo } =
    useEditor(sectionKey)
  const [editingId, setEditingId] = useState(null)
  const [adding, setAdding] = useState(false)

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    )
  }

  const items = data || []

  function deleteItem(id) {
    if (!confirm('Delete this portfolio item?')) return
    update(items.filter((it) => it.id !== id))
  }

  function saveItem(form) {
    if (form.id && items.find((it) => it.id === form.id)) {
      update(items.map((it) => (it.id === form.id ? form : it)))
    } else {
      const newItem = { ...form, id: `p-${Date.now()}` }
      update([...items, newItem])
    }
    setEditingId(null)
    setAdding(false)
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <SaveBar
          onSave={save}
          onUndo={undo}
          saving={saving}
          saved={saved}
          dirty={dirty}
        />
        <button
          onClick={() => {
            setAdding(true)
            setEditingId(null)
          }}
          className="admin-btn-primary"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {adding && (
        <div className="mb-6">
          <ItemForm
            item={{ title: '', subtitle: '', src: '', type: 'image' }}
            onSave={saveItem}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      <SortableList
        items={items}
        onReorder={update}
        renderItem={(item) =>
          editingId === item.id ? (
            <ItemForm
              item={item}
              onSave={saveItem}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-center gap-4 bg-white rounded-xl border border-brand-100 p-4">
              {item.src && (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-brand-950 truncate">
                  {item.title || 'Untitled'}
                </p>
                <p className="text-sm text-brand-500 truncate">
                  {item.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditingId(item.id)
                    setAdding(false)
                  }}
                  className="admin-icon-btn"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="admin-icon-btn text-red-500 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        }
      />

      {items.length === 0 && !adding && (
        <div className="text-center py-12 text-brand-400">
          <p>No items yet. Click &ldquo;Add Item&rdquo; to get started.</p>
        </div>
      )}
    </div>
  )
}

export default function PortfolioManager() {
  const [active, setActive] = useState(CATEGORIES[0].key)

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-brand-950">
          Portfolio
        </h1>
        <p className="text-brand-500 mt-2">
          Manage portfolio items across all categories. Drag to reorder, upload new media, or edit details.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
              active === cat.key
                ? 'bg-brand-950 text-white'
                : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <CategoryEditor key={active} sectionKey={active} />
    </div>
  )
}
