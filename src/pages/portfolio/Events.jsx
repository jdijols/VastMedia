import PortfolioGrid from '../../components/ui/PortfolioGrid'
import { useContent } from '../../hooks/useContent'

export default function Events() {
  const { data: items } = useContent('portfolio-events')
  return <PortfolioGrid items={items} />
}
