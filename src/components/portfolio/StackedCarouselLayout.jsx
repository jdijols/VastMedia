import PortfolioCarousel from './PortfolioCarousel'

export default function StackedCarouselLayout({ items, onItemClick }) {
  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <PortfolioCarousel
          key={item.id ?? i}
          item={item}
          onClick={onItemClick}
          className="aspect-[16/9] w-full"
          priority={i < 2}
        />
      ))}
    </div>
  )
}
