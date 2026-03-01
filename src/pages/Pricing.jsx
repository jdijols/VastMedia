import { useState } from 'react'
import { Check } from 'lucide-react'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import { useContent } from '../hooks/useContent'
import { getIcon } from '../lib/icons'
import usePageTitle from '../hooks/usePageTitle'

function ServiceCard({ service }) {
  const Icon = getIcon(service.icon)
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 transition-shadow hover:shadow-xl ${
        service.popular
          ? 'bg-brand-950 text-white ring-2 ring-brand-500'
          : 'bg-white border border-brand-100'
      }`}
    >
      {service.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <div className={`inline-flex self-start p-3 rounded-xl mb-5 ${
        service.popular ? 'bg-brand-800' : 'bg-brand-50'
      }`}>
        <Icon size={24} className={service.popular ? 'text-brand-300' : 'text-brand-600'} />
      </div>

      <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
      <p className={`text-2xl font-bold mb-3 ${
        service.popular ? 'text-brand-400' : 'text-brand-950'
      }`}>
        {service.price}
      </p>
      <p className={`text-sm leading-relaxed mb-6 ${
        service.popular ? 'text-brand-300' : 'text-brand-500'
      }`}>
        {service.description}
      </p>

      <ul className="space-y-3 mb-8 flex-1">
        {(service.features || []).map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check size={16} className={`mt-0.5 flex-shrink-0 ${
              service.popular ? 'text-brand-400' : 'text-brand-500'
            }`} />
            <span className={service.popular ? 'text-brand-200' : 'text-brand-700'}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Button
        to={`/booking?service=${encodeURIComponent(service.name)}`}
        variant={service.popular ? 'primary' : 'secondary'}
        className={`w-full ${
          service.popular ? '!bg-white !text-brand-950 hover:!bg-brand-100' : ''
        }`}
      >
        Get Started
      </Button>
    </div>
  )
}

export default function Pricing() {
  usePageTitle('Pricing')
  const { data, loading } = useContent('pricing')
  const [activeCategory, setActiveCategory] = useState('real-estate')

  const categories = data?.categories || []
  const allServices = data?.services || []
  const filtered = allServices.filter((s) => s.category === activeCategory)

  if (loading || !data) {
    return <Spinner className="min-h-[60vh]" />
  }

  return (
    <section aria-labelledby="pricing-heading" className="py-24">
      <Container>
        <SectionHeading
          as="h1"
          id="pricing-heading"
          eyebrow={data?.heading?.eyebrow}
          title={data?.heading?.title}
          description={data?.heading?.description}
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Service categories">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              role="tab"
              aria-selected={activeCategory === cat.key}
              aria-controls="pricing-panel"
              className={`px-5 py-2.5 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                activeCategory === cat.key
                  ? 'bg-brand-950 text-white'
                  : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-100 hover:text-brand-950'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div id="pricing-panel" role="tabpanel" aria-live="polite" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id || service.name} service={service} />
          ))}
        </div>
      </Container>
    </section>
  )
}
