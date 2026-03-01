import PortfolioWrapper from './PortfolioWrapper'
import { useContent } from '../../hooks/useContent'

export default function PortfolioCategoryPage({ section, layout: Layout }) {
  const { data: items } = useContent(section)

  return (
    <PortfolioWrapper items={items}>
      {({ items, onItemClick }) => (
        <Layout items={items} onItemClick={onItemClick} />
      )}
    </PortfolioWrapper>
  )
}
