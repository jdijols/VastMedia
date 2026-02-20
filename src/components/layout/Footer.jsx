import { Link } from 'react-router-dom'
import { Facebook, Instagram } from 'lucide-react'
import Container from '../ui/Container'

const nav = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Booking', to: '/booking' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-300 mt-auto">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="font-display text-2xl font-bold text-white">
              VAST<span className="text-brand-500">MEDIA</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Austin-based photography and videography. Bold visuals for real estate, events, portraits, and brands.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {nav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-brand-900 hover:bg-brand-800 text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-brand-900 hover:bg-brand-800 text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            <p className="mt-6 text-sm">
              info@vastmedia.com
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 text-center text-xs text-brand-500">
          &copy; {new Date().getFullYear()} Vast Media. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
