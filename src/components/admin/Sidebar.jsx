import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Images,
  DollarSign,
  MessageSquareQuote,
  FileText,
  Home,
  PanelBottom,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/portfolio', icon: Images, label: 'Portfolio' },
  { to: '/admin/pricing', icon: DollarSign, label: 'Services & Pricing' },
  { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
  { to: '/admin/about', icon: FileText, label: 'About Page' },
  { to: '/admin/home', icon: Home, label: 'Home Page' },
  { to: '/admin/footer', icon: PanelBottom, label: 'Footer' },
]

function NavItem({ to, icon: Icon, label, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
          isActive
            ? 'bg-white/10 text-white'
            : 'text-brand-300 hover:text-white hover:bg-white/5'
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  )
}

export default function Sidebar() {
  const { logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav = (
    <>
      <div className="p-6 border-b border-white/10">
        <p className="font-display text-lg font-bold text-white tracking-tight">
          VAST<span className="text-brand-400">MEDIA</span>
        </p>
        <p className="text-xs text-brand-400 mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavItem
            key={link.to}
            {...link}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-brand-300 hover:text-white hover:bg-white/5 transition-colors w-full cursor-pointer"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-950 text-white rounded-lg shadow-lg cursor-pointer"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-brand-950 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-brand-950">
        {nav}
      </aside>
    </>
  )
}
