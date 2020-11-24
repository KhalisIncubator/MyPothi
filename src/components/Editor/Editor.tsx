import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import { RichEditor, RichEditorProps } from 'react-native-pell-rich-editor'
import { WebviewKeys } from 'screens/Settings/DefaultSettings'
import { useDisplaySettings, useFontSizeSettings } from 'store/Settings'
import { useTheme } from 'store/Theme'
import { generateStyle } from './GenerateCSS'

type ViewerProps = RichEditorProps & {
  html: string,
}
const Editor = forwardRef<RichEditor, ViewerProps>( ( { html, ...rest }, ref ) => {
  const [ isWebviewLoaded, updateLoaded ] = useState( false )
  const displaySettings = useDisplaySettings()

  const [ theme ] = useTheme()
  const textSettings = useFontSizeSettings()
  const textStyle = useMemo( () => generateStyle( textSettings ), [ textSettings ] )

  const [ css, setCSS ] = useState( {
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    placeholderColor: 'gray',
    cssText: textStyle,// initial valid
    contentCSSText: 'font-size: 12; min-height: 200px; height: 100%;', // initial valid
  } )

  useEffect( () => {
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

  useEffect( () => {
    setCSS( prev => ( {
      ...prev,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      cssText: textStyle,
    } ) )
  }, [ theme, textStyle ] )

  useEffect( () => {
    // @ts-ignore
    ref?.current?.setContentStyle( css )
  }, [ css, ref ] )

  return (
    <RichEditor
      ref={ref}
      scrollEnabled
      initialContentHTML={html}
      onLoadEnd={() => {updateLoaded( true )}}
      editorStyle={css}
      {...rest} />
  )

} )

export { Editor }
