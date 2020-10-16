import React, {  forwardRef } from 'react'
import { RichEditor, RichEditorProps } from 'react-native-pell-rich-editor'

type ViewerProps = RichEditorProps & {
  html: string,
  // map the function from editor lib to optional
  onHeightChange?: () => void
}
const Editor = forwardRef<RichEditor, ViewerProps>( ( { html, onHeightChange = () => {} ,  ...rest }, ref ) => {

  return (
    <RichEditor
      ref={ref}
      scrollEnabled
      initialContentHTML={html}
      onHeightChange={onHeightChange}
      {...rest} />
  )

} )

export { Editor }
