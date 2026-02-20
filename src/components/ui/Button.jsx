import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer'

const variants = {
  primary:
    'bg-brand-950 text-white hover:bg-brand-800 active:bg-brand-900',
  secondary:
    'bg-white text-brand-950 border border-brand-200 hover:bg-brand-100 active:bg-brand-200',
  ghost:
    'text-brand-950 hover:bg-brand-100 active:bg-brand-200',
}

const sizes = {
  sm: 'text-sm px-4 py-2 rounded-lg',
  md: 'text-sm px-6 py-3 rounded-xl',
  lg: 'text-base px-8 py-4 rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
