import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        closeMenu()
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen, closeMenu])

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector('a')
      firstLink?.focus()
    }
  }, [isMenuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-brand-100">
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">
          <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-tight text-brand-950" aria-label="Vast Media — Home">
            VAST<span className="text-brand-500">MEDIA</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1 list-none" role="list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
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
              </li>
            ))}
            <li>
              <Button to="/booking" size="sm" className="ml-3">
                Book Now
              </Button>
            </li>
          </ul>

          <button
            ref={toggleRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-brand-700 hover:bg-brand-100 cursor-pointer"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className="block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out origin-center"
                style={{ transform: isMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-0.5 w-full bg-current rounded-full transition-all duration-200 ease-in-out"
                style={{ opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)' }}
              />
              <span
                className="block h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out origin-center"
                style={{ transform: isMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
              />
            </div>
          </button>
        </nav>
      </Container>

      <div
        id="mobile-nav-menu"
        ref={menuRef}
        className={`md:hidden grid transition-[grid-template-rows,border-color] duration-300 ease-in-out border-t ${
          isMenuOpen ? 'border-brand-100' : 'border-transparent'
        } bg-white`}
        style={{ gridTemplateRows: isMenuOpen ? '1fr' : '0fr' }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="overflow-hidden">
          <Container className="py-4">
            <ul className="flex flex-col gap-1 list-none" role="list">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMenu}
                    tabIndex={isMenuOpen ? 0 : -1}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-brand-950 bg-brand-100'
                          : 'text-brand-600 hover:text-brand-950 hover:bg-brand-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Button to="/booking" size="sm" className="mt-2" onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
                  Book Now
                </Button>
              </li>
            </ul>
          </Container>
        </div>
      </div>
    </header>
  )
}
