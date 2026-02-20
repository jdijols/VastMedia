import { Plus, Trash2 } from 'lucide-react'
import { useEditor } from '../../hooks/useEditor'
import SaveBar from '../../components/admin/SaveBar'
import MediaUploader from '../../components/admin/MediaUploader'
import { ICON_OPTIONS } from '../../lib/icons'

export default function HomeEditor() {
  const { data, loading, saving, saved, error, dirty, update, save, reset } =
    useEditor('homepage')

  if (loading || !data) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    )
  }

  const { hero, services, cta } = data

  function setSection(section, key, value) {
    update({ ...data, [section]: { ...data[section], [key]: value } })
  }

  function updateServiceItem(index, key, value) {
    const items = [...services.items]
    items[index] = { ...items[index], [key]: value }
    setSection('services', 'items', items)
  }

  function addServiceItem() {
    setSection('services', 'items', [
      ...services.items,
      { id: `svc-${Date.now()}`, icon: 'Camera', title: '', description: '' },
    ])
  }

  function removeServiceItem(index) {
    setSection(
      'services',
      'items',
      services.items.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-brand-950">
          Home Page
        </h1>
        <p className="text-brand-500 mt-2">Edit your home page content.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <SaveBar onSave={save} onReset={reset} saving={saving} saved={saved} dirty={dirty} />
      </div>

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6">
        <h2 className="font-semibold text-brand-950 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="admin-label">Eyebrow</label>
            <input
              className="admin-input"
              value={hero.eyebrow}
              onChange={(e) => setSection('hero', 'eyebrow', e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Title</label>
              <input
                className="admin-input"
                value={hero.title}
                onChange={(e) => setSection('hero', 'title', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Title Accent (colored word)</label>
              <input
                className="admin-input"
                value={hero.titleAccent}
                onChange={(e) => setSection('hero', 'titleAccent', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Description</label>
            <textarea
              className="admin-input min-h-[80px]"
              value={hero.description}
              onChange={(e) => setSection('hero', 'description', e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Primary CTA Text</label>
              <input
                className="admin-input"
                value={hero.ctaPrimary?.text || ''}
                onChange={(e) =>
                  setSection('hero', 'ctaPrimary', {
                    ...hero.ctaPrimary,
                    text: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="admin-label">Primary CTA Link</label>
              <input
                className="admin-input"
                value={hero.ctaPrimary?.link || ''}
                onChange={(e) =>
                  setSection('hero', 'ctaPrimary', {
                    ...hero.ctaPrimary,
                    link: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Secondary CTA Text</label>
              <input
                className="admin-input"
                value={hero.ctaSecondary?.text || ''}
                onChange={(e) =>
                  setSection('hero', 'ctaSecondary', {
                    ...hero.ctaSecondary,
                    text: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="admin-label">Secondary CTA Link</label>
              <input
                className="admin-input"
                value={hero.ctaSecondary?.link || ''}
                onChange={(e) =>
                  setSection('hero', 'ctaSecondary', {
                    ...hero.ctaSecondary,
                    link: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Background Image</label>
            <MediaUploader
              value={hero.backgroundImage}
              onChange={(url) => setSection('hero', 'backgroundImage', url)}
              accept="image/*"
            />
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6">
        <h2 className="font-semibold text-brand-950 mb-4">
          Services Overview
        </h2>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Eyebrow</label>
              <input
                className="admin-input"
                value={services.eyebrow}
                onChange={(e) => setSection('services', 'eyebrow', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Title</label>
              <input
                className="admin-input"
                value={services.title}
                onChange={(e) => setSection('services', 'title', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Description</label>
            <textarea
              className="admin-input min-h-[60px]"
              value={services.description}
              onChange={(e) =>
                setSection('services', 'description', e.target.value)
              }
            />
          </div>

          <div>
            <label className="admin-label">Service Cards</label>
            <div className="space-y-3">
              {services.items.map((item, i) => (
                <div
                  key={item.id}
                  className="bg-brand-50 rounded-xl p-4 space-y-3"
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="admin-label">Icon</label>
                      <select
                        className="admin-input"
                        value={item.icon}
                        onChange={(e) => updateServiceItem(i, 'icon', e.target.value)}
                      >
                        {ICON_OPTIONS.map((name) => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="admin-label">Title</label>
                      <input
                        className="admin-input"
                        value={item.title}
                        onChange={(e) => updateServiceItem(i, 'title', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="admin-label">Description</label>
                      <textarea
                        className="admin-input min-h-[60px]"
                        value={item.description}
                        onChange={(e) =>
                          updateServiceItem(i, 'description', e.target.value)
                        }
                      />
                    </div>
                    <button
                      onClick={() => removeServiceItem(i)}
                      className="admin-icon-btn text-red-500 hover:bg-red-50 self-end mb-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addServiceItem}
              className="admin-btn-secondary mt-3"
            >
              <Plus size={14} /> Add Service Card
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-950 mb-4">
          Call to Action
        </h2>
        <div className="space-y-4">
          <div>
            <label className="admin-label">Title</label>
            <input
              className="admin-input"
              value={cta.title}
              onChange={(e) => setSection('cta', 'title', e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Description</label>
            <textarea
              className="admin-input min-h-[60px]"
              value={cta.description}
              onChange={(e) => setSection('cta', 'description', e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Button Text</label>
              <input
                className="admin-input"
                value={cta.buttonText}
                onChange={(e) => setSection('cta', 'buttonText', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Button Link</label>
              <input
                className="admin-input"
                value={cta.buttonLink}
                onChange={(e) => setSection('cta', 'buttonLink', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
