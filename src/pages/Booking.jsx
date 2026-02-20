import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Send, CheckCircle } from 'lucide-react'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'

const serviceOptions = [
  'Property Photos',
  'Drone Photos',
  'Property Video',
  'Photo + Drone',
  'Photo + Drone + Video',
  'Luxury Package',
  'Event Photos',
  'Event Video',
  'Portraits',
]

const referralSources = [
  'Google Search',
  'Instagram',
  'Facebook',
  'Referral / Word of Mouth',
  'Zillow / Realtor.com',
  'Other',
]

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  services: [],
  date: '',
  sqft: '',
  referral: '',
  location: '',
  message: '',
  newsletter: false,
}

export default function Booking() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('service')

  const [form, setForm] = useState(() => ({
    ...initialForm,
    services: preselected && serviceOptions.includes(preselected) ? [preselected] : [],
  }))
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function toggleService(service) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="py-24">
        <Container>
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex p-4 rounded-full bg-green-50 mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="font-display text-3xl font-semibold text-brand-950 mb-4">
              Booking Request Sent!
            </h2>
            <p className="text-brand-600 mb-8">
              Thank you, {form.firstName}! We&apos;ll review your request and get back to you within 24 hours.
            </p>
            <Button to="/" variant="secondary">Back to Home</Button>
          </div>
        </Container>
      </section>
    )
  }

  const inputClasses =
    'w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-brand-950 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors'

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Book a Session"
          title="Let's Create Something Amazing"
          description="Fill out the form below and we'll get back to you within 24 hours to confirm your booking."
        />

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white rounded-2xl border border-brand-100 p-8 md:p-12 shadow-sm"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-brand-700 mb-2">
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-brand-700 mb-2">
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-2">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-brand-700 mb-2">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-brand-700 mb-3">
                What services are you interested in?
              </label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((service) => {
                  const selected = form.services.includes(service)
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        selected
                          ? 'bg-brand-950 text-white border-brand-950'
                          : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'
                      }`}
                    >
                      {service}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-brand-700 mb-2">
                Preferred Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="sqft" className="block text-sm font-medium text-brand-700 mb-2">
                Square Footage of Home
              </label>
              <input
                id="sqft"
                name="sqft"
                type="text"
                placeholder="e.g. 2,500"
                value={form.sqft}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-brand-700 mb-2">
                Location / Address
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="123 Main St, Austin, TX"
                value={form.location}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="referral" className="block text-sm font-medium text-brand-700 mb-2">
                How did you hear of us?
              </label>
              <select
                id="referral"
                name="referral"
                value={form.referral}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select an option</option>
                {referralSources.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-brand-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell us about your project, specific requirements, or any questions..."
                value={form.message}
                onChange={handleChange}
                className={`${inputClasses} resize-vertical`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={form.newsletter}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500/20"
                />
                <span className="text-sm text-brand-600">Sign up for news and updates</span>
              </label>
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Send size={16} />
              Submit Booking Request
            </Button>
          </div>
        </form>
      </Container>
    </section>
  )
}
