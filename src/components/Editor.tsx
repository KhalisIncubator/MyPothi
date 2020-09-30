import React, {  forwardRef } from 'react'
import { RichEditor, RichEditorProps } from 'react-native-pell-rich-editor'

type ViewerProps = RichEditorProps & {
  html: string,
}
const Editor = forwardRef<RichEditor, ViewerProps>( ( { editorStyle, html , containerStyle, ...rest }, ref ) => {

  return (
    <RichEditor
      ref={ref}
      style={editorStyle}
      editorStyle={editorStyle}
      initialContentHTML={html}
      containerStyle={containerStyle}
      {...rest} />
  )

} )

export { Editor }
