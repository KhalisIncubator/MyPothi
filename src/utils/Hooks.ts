import {useWindowDimensions} from 'react-native';

const useIsTablet = () => {
  const dimensions = useWindowDimensions()

  const isTablet = dimensions.width > 900

  return [isTablet]
}

export {useIsTablet}
