import { NavLink, Outlet } from 'react-router-dom'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'

const tabs = [
  { label: 'Real Estate', to: '/portfolio' },
  { label: 'Videography', to: '/portfolio/videography' },
  { label: 'Portraits', to: '/portfolio/portraits' },
  { label: 'Events', to: '/portfolio/events' },
]

export default function PortfolioLayout() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Our Work"
          description="Browse through our recent projects across real estate, videography, portraits, and events."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
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
        </div>

        <Outlet />
      </Container>
    </section>
  )
}
