import { Pothi } from 'db/models'
import { useCurrentState } from 'providers/CurrentProvider'
import { usePothis } from './use-pothis'

export const useCurrentPothi = (): [Pothi] => {
  const [ currentPothi ] = useCurrentState()
  const [ pothis ] = usePothis()

  return [ pothis.find( pothi => pothi.title === currentPothi ) ?? pothis[ 0 ] ]
}