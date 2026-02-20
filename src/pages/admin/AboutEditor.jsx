import { Plus, Trash2 } from 'lucide-react'
import { useEditor } from '../../hooks/useEditor'
import SaveBar from '../../components/admin/SaveBar'
import MediaUploader from '../../components/admin/MediaUploader'

export default function AboutEditor() {
  const { data, loading, saving, saved, error, dirty, update, save, reset } =
    useEditor('about')

  if (loading || !data) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    )
  }

  const { intro, austin, stats } = data

  function setNested(section, key, value) {
    update({ ...data, [section]: { ...data[section], [key]: value } })
  }

  function updateParagraph(section, index, value) {
    const paragraphs = [...data[section].paragraphs]
    paragraphs[index] = value
    setNested(section, 'paragraphs', paragraphs)
  }

  function addParagraph(section) {
    setNested(section, 'paragraphs', [...data[section].paragraphs, ''])
  }

  function removeParagraph(section, index) {
    setNested(
      section,
      'paragraphs',
      data[section].paragraphs.filter((_, i) => i !== index)
    )
  }

  function updateStat(index, key, value) {
    const items = [...stats.items]
    items[index] = { ...items[index], [key]: value }
    setNested('stats', 'items', items)
  }

  function addStat() {
    setNested('stats', 'items', [
      ...stats.items,
      { id: `stat-${Date.now()}`, value: '', label: '' },
    ])
  }

  function removeStat(index) {
    setNested(
      'stats',
      'items',
      stats.items.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-brand-950">
          About Page
        </h1>
        <p className="text-brand-500 mt-2">Edit your about page content.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <SaveBar onSave={save} onReset={reset} saving={saving} saved={saved} dirty={dirty} />
      </div>

      {/* Intro Section */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6">
        <h2 className="font-semibold text-brand-950 mb-4">Intro Section</h2>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="admin-label">Eyebrow</label>
              <input
                className="admin-input"
                value={intro.eyebrow}
                onChange={(e) => setNested('intro', 'eyebrow', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Title</label>
              <input
                className="admin-input"
                value={intro.title}
                onChange={(e) => setNested('intro', 'title', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Title Accent</label>
              <input
                className="admin-input"
                value={intro.titleAccent}
                onChange={(e) => setNested('intro', 'titleAccent', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Paragraphs</label>
            <div className="space-y-3">
              {intro.paragraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    className="admin-input flex-1 min-h-[80px]"
                    value={p}
                    onChange={(e) => updateParagraph('intro', i, e.target.value)}
                  />
                  <button
                    onClick={() => removeParagraph('intro', i)}
                    className="admin-icon-btn text-red-500 hover:bg-red-50 self-start mt-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => addParagraph('intro')}
              className="admin-btn-secondary mt-3"
            >
              <Plus size={14} /> Add Paragraph
            </button>
          </div>

          <div>
            <label className="admin-label">Photo</label>
            <MediaUploader
              value={intro.image}
              onChange={(url) => setNested('intro', 'image', url)}
              accept="image/*"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Badge Value</label>
              <input
                className="admin-input"
                value={intro.badge?.value || ''}
                onChange={(e) =>
                  setNested('intro', 'badge', { ...intro.badge, value: e.target.value })
                }
              />
            </div>
            <div>
              <label className="admin-label">Badge Label</label>
              <input
                className="admin-input"
                value={intro.badge?.label || ''}
                onChange={(e) =>
                  setNested('intro', 'badge', { ...intro.badge, label: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Austin Section */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6">
        <h2 className="font-semibold text-brand-950 mb-4">Austin Identity</h2>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Eyebrow</label>
              <input
                className="admin-input"
                value={austin.eyebrow}
                onChange={(e) => setNested('austin', 'eyebrow', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Title</label>
              <input
                className="admin-input"
                value={austin.title}
                onChange={(e) => setNested('austin', 'title', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="admin-label">Paragraphs</label>
            <div className="space-y-3">
              {austin.paragraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    className="admin-input flex-1 min-h-[80px]"
                    value={p}
                    onChange={(e) => updateParagraph('austin', i, e.target.value)}
                  />
                  <button
                    onClick={() => removeParagraph('austin', i)}
                    className="admin-icon-btn text-red-500 hover:bg-red-50 self-start mt-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => addParagraph('austin')}
              className="admin-btn-secondary mt-3"
            >
              <Plus size={14} /> Add Paragraph
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-950 mb-4">Stats</h2>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Eyebrow</label>
              <input
                className="admin-input"
                value={stats.eyebrow}
                onChange={(e) => setNested('stats', 'eyebrow', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Title</label>
              <input
                className="admin-input"
                value={stats.title}
                onChange={(e) => setNested('stats', 'title', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            {stats.items.map((stat, i) => (
              <div key={stat.id} className="flex gap-3 items-start bg-brand-50 rounded-xl p-4">
                <div className="grid gap-3 sm:grid-cols-2 flex-1">
                  <div>
                    <label className="admin-label">Value</label>
                    <input
                      className="admin-input"
                      value={stat.value}
                      onChange={(e) => updateStat(i, 'value', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Label</label>
                    <input
                      className="admin-input"
                      value={stat.label}
                      onChange={(e) => updateStat(i, 'label', e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeStat(i)}
                  className="admin-icon-btn text-red-500 hover:bg-red-50 mt-6"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addStat} className="admin-btn-secondary">
            <Plus size={14} /> Add Stat
          </button>
        </div>
      </div>
    </div>
  )
}
