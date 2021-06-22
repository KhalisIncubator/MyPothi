import { useWindowDimensions } from 'react-native'
export const useIsTablet = () => {
  const dimension = useWindowDimensions()
  return [ dimension.width > 900 ] 
}
