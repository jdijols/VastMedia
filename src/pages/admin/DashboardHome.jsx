import { Link } from 'react-router-dom'
import {
  Images,
  DollarSign,
  MessageSquareQuote,
  FileText,
  Home,
  PanelBottom,
  ExternalLink,
} from 'lucide-react'

const sections = [
  {
    to: '/admin/portfolio',
    icon: Images,
    title: 'Portfolio',
    description: 'Manage photos and videos across all portfolio categories.',
  },
  {
    to: '/admin/pricing',
    icon: DollarSign,
    title: 'Services & Pricing',
    description: 'Edit service packages, pricing, and feature lists.',
  },
  {
    to: '/admin/testimonials',
    icon: MessageSquareQuote,
    title: 'Testimonials',
    description: 'Add, edit, or remove client testimonials.',
  },
  {
    to: '/admin/about',
    icon: FileText,
    title: 'About Page',
    description: 'Update your story, stats, and about page copy.',
  },
  {
    to: '/admin/home',
    icon: Home,
    title: 'Home Page',
    description: 'Edit hero text, service cards, and the call-to-action.',
  },
  {
    to: '/admin/footer',
    icon: PanelBottom,
    title: 'Footer',
    description: 'Edit footer text, contact info, and social media links.',
  },
]

export default function DashboardHome() {
  return (
    <div className="pt-8 lg:pt-0">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold text-brand-950">
          Dashboard
        </h1>
        <p className="text-brand-500 mt-2">
          Manage your website content. Changes go live when you save.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.to}
              to={section.to}
              className="group bg-white rounded-2xl border border-brand-100 p-6 hover:shadow-lg hover:border-brand-200 transition-all duration-200"
            >
              <div className="inline-flex p-3 rounded-xl bg-brand-50 group-hover:bg-brand-950 transition-colors duration-200 mb-4">
                <Icon
                  size={22}
                  className="text-brand-600 group-hover:text-white transition-colors duration-200"
                />
              </div>
              <h3 className="font-semibold text-brand-950 mb-1">
                {section.title}
              </h3>
              <p className="text-sm text-brand-500">{section.description}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-950 mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-950 bg-brand-50 px-4 py-2 rounded-lg transition-colors"
          >
            View Live Site <ExternalLink size={14} />
          </a>
          <a
            href="/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-950 bg-brand-50 px-4 py-2 rounded-lg transition-colors"
          >
            View Portfolio <ExternalLink size={14} />
          </a>
          <a
            href="/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-950 bg-brand-50 px-4 py-2 rounded-lg transition-colors"
          >
            View Pricing <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
