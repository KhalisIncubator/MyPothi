
import React, { useRef } from 'react'
import { RichEditor } from 'react-native-pell-rich-editor'
import { DynamicScrollView } from 'components/DynamicScrollView'
import { Editor } from 'components/Editor/Editor'


const Viewer = () => {
  const EditorRef = useRef<RichEditor>( null )

  return (
    <DynamicScrollView >
      <Editor ref={EditorRef}/>
    </DynamicScrollView>
  )
}
export { Viewer }
