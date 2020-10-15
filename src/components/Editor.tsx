import React, {  forwardRef } from 'react'
import { RichEditor, RichEditorProps } from 'react-native-pell-rich-editor'

type ViewerProps = RichEditorProps & {
  html: string,
}
const Editor = forwardRef<RichEditor, ViewerProps>( ( { html ,  ...rest }, ref ) => {

  return (
    <RichEditor
      ref={ref}
      scrollEnabled
      initialContentHTML={html}
      {...rest} />
  )

} )

export { Editor }
