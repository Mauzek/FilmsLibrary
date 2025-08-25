import { useParams } from 'react-router-dom'

export const Collection = () => {
    const { slug } = useParams();
  return (
    <div>Collection {slug}</div>
  )
}
