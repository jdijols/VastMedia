import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { useContent } from '../hooks/useContent'
import { getIcon } from '../lib/icons'

export default function Home() {
  const { data: homepage, loading: loadingHome } = useContent('homepage')
  const { data: testimonials, loading: loadingTest } = useContent('testimonials')

  const loading = loadingHome || loadingTest
  const { hero, services, cta } = homepage ?? {}
  const count = testimonials?.length ?? 0

  const [current, setCurrent] = useState(0)
  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + count) % count), [count])

  useEffect(() => {
    if (count === 0) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next, count])

  if (loading || !homepage) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] min-h-[600px] flex items-center overflow-hidden">
        <img
          src={hero.backgroundImage}
          alt="Luxury real estate photography"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <Container className="relative z-10 w-full">
          <div className="max-w-4xl bg-gradient-to-br from-brand-950/60 to-brand-900/45 backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-14">
            <p className="text-brand-300 text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              {hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              {hero.title}
              <br />
              <span className="text-brand-400">{hero.titleAccent}</span>
            </h1>
            <p className="text-brand-200 text-lg md:text-xl leading-relaxed mb-10">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to={hero.ctaPrimary?.link} size="lg">
                {hero.ctaPrimary?.text}
              </Button>
              <Button
                to={hero.ctaSecondary?.link}
                variant="secondary"
                size="lg"
                className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
              >
                {hero.ctaSecondary?.text}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow={services.eyebrow}
            title={services.title}
            description={services.description}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((service) => {
              const Icon = getIcon(service.icon)
              return (
                <div
                  key={service.id || service.title}
                  className="group bg-white rounded-2xl border border-brand-100 overflow-hidden hover:shadow-xl hover:border-brand-200 transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    {service.image && (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="px-8 pb-8 pt-5">
                    <div className="inline-flex p-3 rounded-xl bg-brand-50 group-hover:bg-brand-950 transition-colors duration-300 mb-5">
                      <Icon size={24} className="text-brand-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-brand-950 mb-2">{service.title}</h3>
                    <p className="text-sm text-brand-500 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Button to="/pricing" variant="secondary">View All Services & Pricing</Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      {count > 0 && (
        <section className="py-24 bg-white">
          <Container>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">
                Testimonials
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-950">
                What Our Clients Say
              </h2>
            </div>

            <div className="relative max-w-3xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {testimonials.map((t, i) => (
                    <div key={t.id || i} className="w-full flex-shrink-0 px-4">
                      <div className="bg-brand-50 rounded-2xl p-8 md:p-12 text-center">
                        <div className="flex justify-center gap-1 mb-6">
                          {Array.from({ length: t.stars }).map((_, j) => (
                            <Star key={j} size={18} className="fill-brand-500 text-brand-500" />
                          ))}
                        </div>
                        <blockquote className="text-lg md:text-xl text-brand-700 leading-relaxed mb-8 italic">
                          &ldquo;{t.text}&rdquo;
                        </blockquote>
                        <p className="font-semibold text-brand-950">{t.name}</p>
                        <p className="text-sm text-brand-500 mt-1">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white shadow-lg border border-brand-100 text-brand-700 hover:bg-brand-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white shadow-lg border border-brand-100 text-brand-700 hover:bg-brand-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-brand-950 w-6' : 'bg-brand-300'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <img
          src={cta.backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <Container className="relative z-10">
          <div className="bg-gradient-to-br from-brand-950/60 to-brand-900/45 backdrop-blur-sm rounded-3xl p-12 md:p-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              {cta.title}
            </h2>
            <p className="text-brand-300 text-lg max-w-xl mx-auto mb-8">
              {cta.description}
            </p>
            <Button to={cta.buttonLink} size="lg" className="!bg-white !text-brand-950 hover:!bg-brand-100">
              {cta.buttonText}
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
