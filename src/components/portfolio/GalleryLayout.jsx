import PortfolioItem from './PortfolioItem'

export default function GalleryLayout({ items, onItemClick }) {
  return (
    <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" role="region" aria-label="Portrait gallery">
      {items.map((item, i) => (
        <PortfolioItem
          key={item.id ?? i}
          item={item}
          onClick={onItemClick}
          className="aspect-[3/4]"
          priority={i < 4}
        />
      ))}
    </div>
  )
}
