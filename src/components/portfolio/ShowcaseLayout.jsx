import { useMemo } from 'react'
import PortfolioItem from './PortfolioItem'
import PortfolioCarousel from './PortfolioCarousel'

/**
 * Distributes `count` images into rows of max 3, ensuring every row
 * fills 100% width (no row of 1 unless count itself is 1).
 *
 * n%3===0 → all rows of 3
 * n%3===2 → one row of 2, rest rows of 3
 * n%3===1 → two rows of 2, rest rows of 3 (avoids a lone row of 1)
 *
 * Rows of 2 and 3 are interleaved for visual balance.
 */
function distributeIntoRows(count) {
  if (count === 0) return []
  if (count <= 3) return [count]
  if (count === 4) return [2, 2]

  let threes, twos
  const r = count % 3
  if (r === 0) {
    threes = count / 3
    twos = 0
  } else if (r === 1) {
    threes = (count - 4) / 3
    twos = 2
  } else {
    threes = (count - 2) / 3
    twos = 1
  }

  if (twos === 0) return Array(threes).fill(3)

  const rows = []
  let t = threes
  let tw = twos
  let next = threes >= twos ? 3 : 2

  while (t > 0 || tw > 0) {
    if (next === 3 && t > 0) {
      rows.push(3); t--; next = 2
    } else if (next === 2 && tw > 0) {
      rows.push(2); tw--; next = 3
    } else if (t > 0) {
      rows.push(3); t--
    } else {
      rows.push(2); tw--
    }
  }

  return rows
}

export default function ShowcaseLayout({ items, onItemClick }) {
  const sections = useMemo(() => {
    const result = []
    let imageBuffer = []

    function flushImages() {
      if (imageBuffer.length > 0) {
        result.push({ type: 'grid', items: imageBuffer })
        imageBuffer = []
      }
    }

    for (const item of items) {
      if (item.type === 'carousel') {
        flushImages()
        result.push({ type: 'carousel', item })
      } else {
        imageBuffer.push(item)
      }
    }
    flushImages()
    return result
  }, [items])

  let imgCount = 0

  return (
    <div className="space-y-1" role="region" aria-label="Portfolio showcase">
      {sections.map((section, si) => {
        if (section.type === 'carousel') {
          return (
            <PortfolioCarousel
              key={section.item.id ?? si}
              item={section.item}
              onClick={onItemClick}
              className="aspect-[16/9] w-full"
              priority={si < 2}
            />
          )
        }

        const startIdx = imgCount
        imgCount += section.items.length
        const rowSizes = distributeIntoRows(section.items.length)
        let offset = 0

        return (
          <div key={`grid-${si}`} className="space-y-1">
            {rowSizes.map((size, ri) => {
              const rowStart = offset
              offset += size
              return (
                <div key={ri} className="flex flex-wrap gap-1">
                  {section.items.slice(rowStart, rowStart + size).map((item, i) => (
                    <PortfolioItem
                      key={item.id ?? `${si}-${ri}-${i}`}
                      item={item}
                      onClick={onItemClick}
                      className="aspect-[4/3] basis-full sm:basis-[calc(50%_-_2px)] lg:basis-0 grow min-w-0"
                      priority={startIdx + rowStart + i < 4}
                    />
                  ))}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
