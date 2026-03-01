import { NavLink, Outlet } from 'react-router-dom'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import usePageTitle from '../../hooks/usePageTitle'

const tabs = [
  { label: 'Real Estate', to: '/portfolio' },
  { label: 'Videography', to: '/portfolio/videography' },
  { label: 'Events', to: '/portfolio/events' },
  { label: 'Portraits', to: '/portfolio/portraits' },
]

export default function PortfolioLayout() {
  usePageTitle('Portfolio')
  return (
    <section aria-labelledby="portfolio-heading" className="pt-24 pb-0">
      <Container>
        <SectionHeading
          as="h1"
          id="portfolio-heading"
          eyebrow="Portfolio"
          title="Our Work"
          description="Browse through our recent projects across real estate, videography, events, and portraits."
        />

        <nav className="flex flex-wrap justify-center gap-2 mb-12" aria-label="Portfolio categories">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end
              className={({ isActive }) =>
                `px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? 'bg-brand-950 text-white'
                    : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-100 hover:text-brand-950'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </Container>

      <Outlet />
    </section>
  )
}
