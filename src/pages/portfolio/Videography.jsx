import PortfolioGrid from '../../components/ui/PortfolioGrid'
import { useContent } from '../../hooks/useContent'

export default function Videography() {
  const { data: items } = useContent('portfolio-videography')
  return <PortfolioGrid items={items} />
}
