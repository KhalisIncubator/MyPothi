import React from 'react'
import {
  StyleSheet,
  Text,
} from 'react-native'

import {
  ApiVishraams,
  VishraamType,
} from '../../../../types/types'
import { mapVishraams } from '../../../Functions'
import { useLine } from '../../../Hooks'

const generateVishraamStyle = ( type ) => {
  switch ( type ) {
    case 'y':
      return styles.YamkiVishraam
    case 'v':
      return styles.FullVishraam
    case 't':
      return styles.ThamkiVishraam
    default: return { }
  }
}

// TEXT NODES

const DefaultText = () => {
  const line = useLine()

  return <Text>{line}</Text>
}

interface VishraamsProps {
  vishraams?: ApiVishraams,
  source: VishraamType,
  lineID?: number // not really necessary, just helpful for the key prop
}
const VishraamText: React.FC<VishraamsProps> = ( { vishraams, source, lineID } ) => {
  const line = useLine()
  return (
    <>
      {mapVishraams( line, vishraams, source ).map( (
        { data, type }, index,
      ) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={`${data}-lineID${lineID}-${type}-${index}`} style={generateVishraamStyle( type )}>{data}</Text>
      ) ) || (
      <Text>
        {line}
      </Text>
      ) }
    </>
  )
}
export {
  DefaultText,
  VishraamText,
}
const styles = StyleSheet.create( {
  FullVishraam: {
    // color: '#e14500', alt orange
    // color: '#ea4600', base for main vishraams
    color: '#d2470b',
  },
  // TODO: implement when gursewak db is added
  ThamkiVishraam: {
    // color: '#739968', light green color: now used as base for thamki
    // color: '#688d5d',
    color: '#537e47',
  },
  YamkiVishraam: {
    // color: '#237fad', dark blue, base for jamki
    color: '#417d9a',
  },
  // #cc7100
} )
