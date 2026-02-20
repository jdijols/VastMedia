import PortfolioGrid from '../../components/ui/PortfolioGrid'
import { useContent } from '../../hooks/useContent'

export default function Portraits() {
  const { data: items } = useContent('portfolio-portraits')
  return <PortfolioGrid items={items} />
}
