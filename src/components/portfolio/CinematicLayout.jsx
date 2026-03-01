import PortfolioItem from './PortfolioItem'

export default function CinematicLayout({ items, onItemClick }) {
  const [featured, ...rest] = items

  return (
    <div className="space-y-1" role="region" aria-label="Videography gallery">
      {featured && (
        <PortfolioItem
          item={featured}
          onClick={onItemClick}
          className="aspect-video w-full"
          showPlayIcon={featured.type === 'video'}
          priority
        />
      )}

      <div className="grid gap-1 grid-cols-1 sm:grid-cols-2">
        {rest.map((item, i) => (
          <PortfolioItem
            key={item.id ?? i}
            item={item}
            onClick={onItemClick}
            className="aspect-video"
            showPlayIcon={item.type === 'video'}
            priority={i < 2}
          />
        ))}
      </div>
    </div>
  )
}
