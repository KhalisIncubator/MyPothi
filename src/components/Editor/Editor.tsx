import React, { forwardRef, useEffect, useState } from 'react'
import { RichEditor, RichEditorProps } from 'react-native-pell-rich-editor'
import { WebviewKeys } from 'screens/Settings/DefaultSettings'
import { useDisplaySettings } from 'store/Settings'

type ViewerProps = RichEditorProps & {
  html: string,
}
const Editor = forwardRef<RichEditor, ViewerProps>( ( { html, ...rest }, ref ) => {
  const [ isWebviewLoaded, updateLoaded ] = useState( false )
  const displaySettings = useDisplaySettings()

  useEffect( () => {
    console.log( 'running' )
    Object.entries( displaySettings ).map( ( [ key, value ] ) => {
      if ( WebviewKeys.includes( key ) ) {
        // @ts-ignore
        ref?.current?.webviewBridge?.injectJavaScript(
          `document.querySelectorAll('.${key}').forEach(node => {
            node.style.display = ${value} ? "block" : "none";
          });
          true;
          `
        )
      }
    } )

  }, [ displaySettings, isWebviewLoaded, ref ] )
  return (
    <RichEditor
      ref={ref}
      scrollEnabled
      initialContentHTML={html}
      onLoadEnd={() => {updateLoaded( true )}}
      {...rest} />
  )

} )

export { Editor }
