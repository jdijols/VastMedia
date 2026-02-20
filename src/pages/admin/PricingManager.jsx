import { useState } from 'react'
import { Plus, ChevronUp, ChevronDown, Pencil, Trash2, X, Star } from 'lucide-react'
import { useEditor } from '../../hooks/useEditor'
import SaveBar from '../../components/admin/SaveBar'
import { ICON_OPTIONS } from '../../lib/icons'

function ServiceForm({ item, onSave, onCancel, categories }) {
  const [form, setForm] = useState({ ...item, features: [...(item.features || [])] })
  const [newFeature, setNewFeature] = useState('')

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  function addFeature() {
    if (!newFeature.trim()) return
    set('features', [...form.features, newFeature.trim()])
    setNewFeature('')
  }

  function removeFeature(i) {
    set('features', form.features.filter((_, idx) => idx !== i))
  }

  return (
    <div className="bg-brand-50 rounded-xl p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label">Service Name</label>
          <input
            className="admin-input"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Luxury Package"
          />
        </div>
        <div>
          <label className="admin-label">Price</label>
          <input
            className="admin-input"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            placeholder="e.g. $499 or Custom"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label">Category</label>
          <select
            className="admin-input"
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label">Icon</label>
          <select
            className="admin-input"
            value={form.icon}
            onChange={(e) => set('icon', e.target.value)}
          >
            {ICON_OPTIONS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="admin-label">Description</label>
        <textarea
          className="admin-input min-h-[80px]"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Service description"
        />
      </div>

      <div>
        <label className="admin-label">Features</label>
        <div className="space-y-2 mb-3">
          {form.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className="admin-input flex-1"
                value={f}
                onChange={(e) => {
                  const updated = [...form.features]
                  updated[i] = e.target.value
                  set('features', updated)
                }}
              />
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="admin-icon-btn text-red-500 hover:bg-red-50"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="admin-input flex-1"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <button type="button" onClick={addFeature} className="admin-btn-secondary">
            Add
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.popular || false}
            onChange={(e) => set('popular', e.target.checked)}
            className="w-4 h-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-brand-700 flex items-center gap-1">
            <Star size={14} /> Mark as popular
          </span>
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="admin-btn-primary">
          {item.id ? 'Update' : 'Add Service'}
        </button>
        <button onClick={onCancel} className="admin-btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default function PricingManager() {
  const { data, loading, saving, saved, error, dirty, update, save, reset } =
    useEditor('pricing')
  const [editingId, setEditingId] = useState(null)
  const [adding, setAdding] = useState(false)
  const [activeCategory, setActiveCategory] = useState('real-estate')

  if (loading || !data) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    )
  }

  const categories = data.categories || []
  const allServices = data.services || []
  const filtered = allServices.filter((s) => s.category === activeCategory)

  function moveItem(index, direction) {
    const catItems = [...filtered]
    const target = index + direction
    if (target < 0 || target >= catItems.length) return
    ;[catItems[index], catItems[target]] = [catItems[target], catItems[index]]

    const others = allServices.filter((s) => s.category !== activeCategory)
    update({ ...data, services: [...others, ...catItems] })
  }

  function deleteItem(id) {
    if (!confirm('Delete this service package?')) return
    update({ ...data, services: allServices.filter((s) => s.id !== id) })
  }

  function saveItem(form) {
    if (form.id && allServices.find((s) => s.id === form.id)) {
      update({
        ...data,
        services: allServices.map((s) => (s.id === form.id ? form : s)),
      })
    } else {
      const newSvc = { ...form, id: `pkg-${Date.now()}` }
      update({ ...data, services: [...allServices, newSvc] })
    }
    setEditingId(null)
    setAdding(false)
  }

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-brand-950">
          Services & Pricing
        </h1>
        <p className="text-brand-500 mt-2">
          Manage your service packages, pricing, and feature lists.
        </p>
      </div>

      {/* Section heading editor */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-8">
        <h2 className="font-semibold text-brand-950 mb-4">Page Heading</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Eyebrow</label>
            <input
              className="admin-input"
              value={data.heading?.eyebrow || ''}
              onChange={(e) =>
                update({ ...data, heading: { ...data.heading, eyebrow: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="admin-label">Title</label>
            <input
              className="admin-input"
              value={data.heading?.title || ''}
              onChange={(e) =>
                update({ ...data, heading: { ...data.heading, title: e.target.value } })
              }
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="admin-label">Description</label>
          <textarea
            className="admin-input min-h-[60px]"
            value={data.heading?.description || ''}
            onChange={(e) =>
              update({
                ...data,
                heading: { ...data.heading, description: e.target.value },
              })
            }
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-brand-950 text-white'
                : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <SaveBar onSave={save} onReset={reset} saving={saving} saved={saved} dirty={dirty} />
        <button
          onClick={() => {
            setAdding(true)
            setEditingId(null)
          }}
          className="admin-btn-primary"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {adding && (
        <div className="mb-6">
          <ServiceForm
            item={{
              name: '',
              icon: 'Camera',
              price: '',
              description: '',
              features: [],
              category: activeCategory,
              popular: false,
            }}
            onSave={saveItem}
            onCancel={() => setAdding(false)}
            categories={categories}
          />
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((svc, i) =>
          editingId === svc.id ? (
            <ServiceForm
              key={svc.id}
              item={svc}
              onSave={saveItem}
              onCancel={() => setEditingId(null)}
              categories={categories}
            />
          ) : (
            <div
              key={svc.id}
              className="flex items-center gap-4 bg-white rounded-xl border border-brand-100 p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-brand-950 truncate">{svc.name}</p>
                  {svc.popular && (
                    <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-brand-500">
                  {svc.price} &middot; {svc.features?.length || 0} features
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => moveItem(i, -1)} disabled={i === 0} className="admin-icon-btn" title="Move up">
                  <ChevronUp size={16} />
                </button>
                <button onClick={() => moveItem(i, 1)} disabled={i === filtered.length - 1} className="admin-icon-btn" title="Move down">
                  <ChevronDown size={16} />
                </button>
                <button onClick={() => { setEditingId(svc.id); setAdding(false) }} className="admin-icon-btn" title="Edit">
                  <Pencil size={16} />
                </button>
                <button onClick={() => deleteItem(svc.id)} className="admin-icon-btn text-red-500 hover:bg-red-50" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {filtered.length === 0 && !adding && (
        <div className="text-center py-12 text-brand-400">
          <p>No services in this category. Click &ldquo;Add Service&rdquo; to create one.</p>
        </div>
      )}
    </div>
  )
}
