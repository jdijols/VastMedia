import { Plus, Trash2 } from 'lucide-react'
import { useEditor } from '../../hooks/useEditor'
import SaveBar from '../../components/admin/SaveBar'
import { SOCIAL_PLATFORMS } from '../../lib/socials'

export default function FooterEditor() {
  const { data, loading, saving, saved, error, dirty, update, save, reset } =
    useEditor('footer')

  if (loading || !data) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    )
  }

  function set(key, value) {
    update({ ...data, [key]: value })
  }

  function updateSocial(index, key, value) {
    const socials = [...data.socials]
    socials[index] = { ...socials[index], [key]: value }

    if (key === 'platform') {
      const match = SOCIAL_PLATFORMS.find((p) => p.key === value)
      if (match) socials[index].label = match.label
    }

    set('socials', socials)
  }

  function addSocial() {
    set('socials', [
      ...data.socials,
      { id: `social-${Date.now()}`, platform: 'other', url: '', label: '' },
    ])
  }

  function removeSocial(index) {
    set(
      'socials',
      data.socials.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-brand-950">
          Footer
        </h1>
        <p className="text-brand-500 mt-2">
          Edit your footer text, contact details, and social media links.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <SaveBar onSave={save} onReset={reset} saving={saving} saved={saved} dirty={dirty} />
      </div>

      {/* Description & Copyright */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6">
        <h2 className="font-semibold text-brand-950 mb-4">General</h2>
        <div className="space-y-4">
          <div>
            <label className="admin-label">Footer Description</label>
            <textarea
              className="admin-input min-h-[80px]"
              value={data.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Short description about your business"
            />
          </div>
          <div>
            <label className="admin-label">Copyright Text</label>
            <input
              className="admin-input"
              value={data.copyright}
              onChange={(e) => set('copyright', e.target.value)}
              placeholder="e.g. Vast Media. All rights reserved."
            />
            <p className="text-xs text-brand-400 mt-1">
              The year is added automatically before this text.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6">
        <h2 className="font-semibold text-brand-950 mb-4">Contact Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Email</label>
            <input
              className="admin-input"
              type="email"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="admin-label">Phone Number</label>
            <input
              className="admin-input"
              type="tel"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="(512) 555-0123"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-950 mb-4">Social Media</h2>
        <div className="space-y-3">
          {data.socials.map((social, i) => (
            <div
              key={social.id}
              className="flex gap-3 items-start bg-brand-50 rounded-xl p-4"
            >
              <div className="grid gap-3 sm:grid-cols-3 flex-1">
                <div>
                  <label className="admin-label">Platform</label>
                  <select
                    className="admin-input"
                    value={social.platform}
                    onChange={(e) => updateSocial(i, 'platform', e.target.value)}
                  >
                    {SOCIAL_PLATFORMS.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="admin-label">Display Name</label>
                  <input
                    className="admin-input"
                    value={social.label}
                    onChange={(e) => updateSocial(i, 'label', e.target.value)}
                    placeholder="e.g. Facebook"
                  />
                </div>
                <div>
                  <label className="admin-label">URL</label>
                  <input
                    className="admin-input"
                    value={social.url}
                    onChange={(e) => updateSocial(i, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <button
                onClick={() => removeSocial(i)}
                className="admin-icon-btn text-red-500 hover:bg-red-50 mt-6"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addSocial} className="admin-btn-secondary mt-4">
          <Plus size={14} /> Add Social Link
        </button>
      </div>
    </div>
  )
}
