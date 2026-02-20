import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { useContent } from '../hooks/useContent'
import { getIcon } from '../lib/icons'

export default function About() {
  const { data } = useContent('about')
  const { intro, austin, stats } = data

  return (
    <>
      <section className="py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">
                {intro.eyebrow}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-brand-950 mb-6">
                {intro.title}
                <br />
                <span className="text-brand-500">{intro.titleAccent}</span>
              </h1>
              <div className="space-y-4 text-brand-600 leading-relaxed">
                {intro.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button to="/booking">Work With Me</Button>
                <Button to="/portfolio" variant="secondary">See My Work</Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={intro.image}
                  alt="Photographer at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-950 text-white rounded-2xl p-6 shadow-xl">
                <p className="font-display text-3xl font-bold">{intro.badge?.value}</p>
                <p className="text-brand-300 text-sm">{intro.badge?.label}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Austin Identity */}
      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">
              {austin.eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-950 mb-6">
              {austin.title}
            </h2>
            {austin.paragraphs.map((p, i) => (
              <p key={i} className="text-brand-600 text-lg leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow={stats.eyebrow} title={stats.title} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.items.map((stat) => {
              const Icon = getIcon(stat.icon)
              return (
                <div key={stat.id || stat.label} className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-brand-50 mb-4">
                    <Icon size={24} className="text-brand-600" />
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-bold text-brand-950">
                    {stat.value}
                  </p>
                  <p className="text-sm text-brand-500 mt-1">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
