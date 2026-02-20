import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-brand-100">
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-tight text-brand-950">
            VAST<span className="text-brand-500">MEDIA</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-brand-950 bg-brand-100'
                      : 'text-brand-600 hover:text-brand-950 hover:bg-brand-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/booking" size="sm" className="ml-3">
              Book Now
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-brand-700 hover:bg-brand-100 rounded-lg"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {open && (
        <div className="md:hidden border-t border-brand-100 bg-white">
          <Container className="py-4 flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-brand-950 bg-brand-100'
                      : 'text-brand-600 hover:text-brand-950 hover:bg-brand-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/booking" size="sm" className="mt-2" onClick={() => setOpen(false)}>
              Book Now
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
