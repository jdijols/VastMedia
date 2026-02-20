import PortfolioGrid from '../../components/ui/PortfolioGrid'
import { useContent } from '../../hooks/useContent'

export default function RealEstate() {
  const { data: items } = useContent('portfolio-real-estate')
  return <PortfolioGrid items={items} />
}
