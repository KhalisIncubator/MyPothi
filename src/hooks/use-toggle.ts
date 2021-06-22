import { useState } from 'react'

export const useToggle = ( initialValue?: boolean ): [ boolean, ( newValue?: boolean ) => void ] => {
  const [ isToggled, setToggle ] = useState<boolean>( initialValue !== undefined ? initialValue : false ) 
  const updateToggle = ( newValue?: boolean ) => { setToggle( prev => newValue ?? !prev )}
  return [ isToggled, updateToggle ] 
}
