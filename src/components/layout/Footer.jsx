import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import Container from '../ui/Container'
import { useContent } from '../../hooks/useContent'
import { getSocialIcon } from '../../lib/socials'

const nav = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Booking', to: '/booking' },
]

export default function Footer() {
  const { data } = useContent('footer')

  if (!data) return null

  return (
    <footer className="bg-brand-950 text-brand-300 mt-auto">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="font-display text-2xl font-bold text-white">
              VAST<span className="text-brand-500">MEDIA</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              {data.description}
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

            {data.socials?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {data.socials.map((social) => {
                  const Icon = getSocialIcon(social.platform)
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-brand-900 hover:bg-brand-800 text-white transition-colors"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            )}

            <div className="mt-6 space-y-2">
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  {data.email}
                </a>
              )}
              {data.phone && (
                <a
                  href={`tel:${data.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <Phone size={14} />
                  {data.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 text-center text-xs text-brand-500">
          &copy; {new Date().getFullYear()} {data.copyright}
        </div>
      </Container>
    </footer>
  )
}
