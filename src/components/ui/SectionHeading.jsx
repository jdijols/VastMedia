export default function SectionHeading({ eyebrow, title, description, center = true, as: Tag = 'h2', id }) {
  return (
    <div className={`max-w-xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">
          {eyebrow}
        </p>
      )}
      <Tag id={id} className="font-display text-3xl md:text-4xl font-semibold text-brand-950 mb-4">
        {title}
      </Tag>
      {description && (
        <p className="text-brand-600 text-lg leading-relaxed">{description}</p>
      )}
    </div>
  )
}
