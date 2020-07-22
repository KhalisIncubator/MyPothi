import { useIsDrawerOpen } from '@react-navigation/drawer'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Appbar,
  useTheme,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { FullScreenCtx } from '../../store/context_stores/Contexts'
import {
  useUpdaters,
  useValues,
} from '../../store/StateHooks'


const Header = ( { previous, navigation } ) => {
  const theme = useTheme()
  const { currentName } = useValues( 'currentModel' )
  const { undoCreation } = useUpdaters( 'currentModel' )
  const { addedItems } = useValues( 'addedModel' )
  const isFullScren = FullScreenCtx.useStoreState( ( store ) => store.isFullScreen )
  const route = useRoute()
  const isDrawerOpen = useIsDrawerOpen()
  const isMain = route.name === 'Gutka'
  return isFullScren ? null : (
    <Appbar.Header theme={{ colors: { primary: theme.colors.backdrop } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate( 'Gutka' )
          }}
        />
      ) : (
        !isDrawerOpen && (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer()
          }}
        >
          <Icon name="menu" size={30} />
        </TouchableOpacity>
        )
      )}
      <Appbar.Content title={isMain ? currentName[ 0 ] : route.name} />
      {isMain && [
        <Appbar.Action
          key="Search"
          icon="search"
          onPress={() => {
            navigation.navigate( 'Stack', { screen: 'Search' } )
          }}
        />,
        <Appbar.Action
          key="Edit"
          icon="list"
          onPress={() => {
            navigation.navigate( 'Stack', {
              screen: 'Edit',
              params: { type: 'Shabad' },
            } )
          }}
        />,
        <Appbar.Action
          key="Settings"
          icon="settings"
          onPress={() => {
            navigation.navigate( 'Stack', { screen: 'Settings' } )
          }}
        />,
      ]}
      {
            route.name === 'Search'
            && (
            <Appbar.Action
              key="undo"
              icon="rotate-ccw"
              onPress={() => {
                if ( addedItems.length ) undoCreation()
              }}
            />
            )
          }
    </Appbar.Header>
  )
}

export { Header }
