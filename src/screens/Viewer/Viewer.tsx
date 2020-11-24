
import React, { useEffect, useRef, useState } from 'react'
import { RichEditor } from 'react-native-pell-rich-editor'
import { DynamicScrollView } from 'components/DynamicScrollView'
import { Editor } from 'components/Editor/Editor'
import { useCurrentPothi } from 'utils/Hooks'
import { switchMap, map, scan, filter } from 'rxjs/operators'
import { from, } from 'rxjs'


const Viewer = () => {
  const EditorRef = useRef<RichEditor>( null )
  const [ currentPothi ] = useCurrentPothi()
  const [ html, setHtml ] = useState( '' )

  useEffect( () => {
    const shabads = currentPothi?.shabads.observe().pipe(
      switchMap( shabads => from( shabads ) ),
      map( ( shabad ) => shabad.html ),
      filter( ( html ) => !!html ),
      scan( ( acc, curr ) => acc + curr, "" )
    )
    const sub = shabads?.subscribe( setHtml )

    return () => sub?.unsubscribe()

  }, [ currentPothi ] )


  return (
    <DynamicScrollView>
      <Editor html={html} onHeightChange={() => 1} ref={EditorRef} onChange={console.log} />
    </DynamicScrollView>
  )
}
export { Viewer }
