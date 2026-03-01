import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, Upload, X, Images, ImageIcon } from 'lucide-react'
import { upload } from '@vercel/blob/client'
import { useEditor } from '../../hooks/useEditor'
import SaveBar from '../../components/admin/SaveBar'
import MediaUploader from '../../components/admin/MediaUploader'
import SortableList from '../../components/admin/SortableList'
import Spinner from '../../components/ui/Spinner'
import ErrorAlert from '../../components/ui/ErrorAlert'

const CATEGORIES = [
  { key: 'portfolio-real-estate', label: 'Real Estate' },
  { key: 'portfolio-videography', label: 'Videography' },
  { key: 'portfolio-events', label: 'Events' },
  { key: 'portfolio-portraits', label: 'Portraits' },
]

const CAROUSEL_CATEGORIES = new Set(['portfolio-real-estate', 'portfolio-events'])
const CAROUSEL_DEFAULT = new Set(['portfolio-events'])

function MultiImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  async function handleFiles(e) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploading(true)
    try {
      const uploaded = await Promise.all(
        files.map((file) =>
          upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/media/upload',
          }).then((blob) => blob.url),
        ),
      )
      onChange([...images, ...uploaded])
    } catch {
      /* upload errors handled per-file */
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function removeImage(index) {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((src, i) => (
            <div key={src + i} className="relative group rounded-lg overflow-hidden aspect-[4/3]">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Remove image"
              >
                <X size={12} />
              </button>
              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      <label
        className={`flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
          uploading
            ? 'border-brand-400 bg-brand-50'
            : 'border-brand-200 hover:border-brand-400 hover:bg-brand-50'
        }`}
      >
        {uploading ? (
          <>
            <div className="w-6 h-6 border-3 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-2" />
            <p className="text-sm text-brand-500">Uploading...</p>
          </>
        ) : (
          <>
            <Upload size={20} className="text-brand-400 mb-2" />
            <p className="text-sm text-brand-600 font-medium">Add images</p>
            <p className="text-xs text-brand-400 mt-0.5">Select one or multiple</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  )
}

function ItemForm({ item, onSave, onCancel, category }) {
  const supportsCarousel = CAROUSEL_CATEGORIES.has(category)
  const defaultType = CAROUSEL_DEFAULT.has(category) ? 'carousel' : item.type || 'image'
  const [form, setForm] = useState({ ...item, type: item.type || defaultType })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  function handleTypeChange(newType) {
    if (newType === 'carousel') {
      const seed = form.src ? [form.src] : []
      set('type', 'carousel')
      setForm((f) => ({ ...f, type: 'carousel', images: f.images || seed, src: undefined }))
    } else {
      set('type', newType)
      setForm((f) => ({ ...f, type: newType, images: undefined }))
    }
  }

  return (
    <div className="bg-brand-50 rounded-xl p-6 space-y-4">
      {supportsCarousel && (
        <div>
          <label className="admin-label">Item Type</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleTypeChange('image')}
              aria-pressed={form.type !== 'carousel'}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                form.type !== 'carousel'
                  ? 'bg-brand-950 text-white'
                  : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-100'
              }`}
            >
              <ImageIcon size={14} />
              Single Image
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('carousel')}
              aria-pressed={form.type === 'carousel'}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                form.type === 'carousel'
                  ? 'bg-brand-950 text-white'
                  : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-100'
              }`}
            >
              <Images size={14} />
              Image Set
            </button>
          </div>
        </div>
      )}

      {form.type === 'carousel' ? (
        <div>
          <label className="admin-label">Images</label>
          <MultiImageUploader
            images={form.images || []}
            onChange={(imgs) => set('images', imgs)}
          />
        </div>
      ) : (
        <>
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

          {!supportsCarousel && (
            <div>
              <label htmlFor="admin-portfolio-type" className="admin-label">Type</label>
              <select
                id="admin-portfolio-type"
                className="admin-input"
                value={form.type}
                onChange={(e) => set('type', e.target.value)}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
          )}
        </>
      )}

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

function ItemThumbnail({ item }) {
  if (item.type === 'carousel' && item.images?.length > 0) {
    return (
      <div className="relative w-20 h-14 flex-shrink-0">
        <img src={item.images[0]} alt="" className="w-full h-full object-cover rounded-lg" />
        <span className="absolute -top-1 -right-1 bg-brand-950 text-white text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
          {item.images.length}
        </span>
      </div>
    )
  }
  if (item.src) {
    return <img src={item.src} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
  }
  return null
}

function CategoryEditor({ sectionKey }) {
  const { data, loading, saving, saved, error, dirty, update, save, undo } =
    useEditor(sectionKey)
  const [editingId, setEditingId] = useState(null)
  const [adding, setAdding] = useState(false)

  const defaultType = CAROUSEL_DEFAULT.has(sectionKey) ? 'carousel' : 'image'

  if (loading) {
    return <Spinner />
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

  const newItemDefaults =
    defaultType === 'carousel'
      ? { type: 'carousel', images: [] }
      : { src: '', type: 'image' }

  return (
    <div>
      <ErrorAlert message={error} />

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
            item={newItemDefaults}
            onSave={saveItem}
            onCancel={() => setAdding(false)}
            category={sectionKey}
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
              category={sectionKey}
            />
          ) : (
            <div className="flex items-center gap-4 bg-white rounded-xl border border-brand-100 p-4">
              <ItemThumbnail item={item} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brand-500 capitalize flex items-center gap-1.5">
                  {item.type === 'carousel' ? (
                    <>
                      <Images size={14} className="text-brand-400" />
                      Image Set ({item.images?.length || 0})
                    </>
                  ) : (
                    item.type || 'image'
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditingId(item.id)
                    setAdding(false)
                  }}
                  className="admin-icon-btn"
                  aria-label="Edit item"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="admin-icon-btn text-red-500 hover:bg-red-50"
                  aria-label="Delete item"
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

      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Portfolio categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            role="tab"
            aria-selected={active === cat.key}
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
