import React, { createContext , useState } from 'react'
import { MainRouteParams } from '../navigation'


type Error = {
  error: string,
  screen: keyof MainRouteParams | ''
}
type ErrorSnackCtx = {
  error: Error,
  updateError: ( error: Error ) => void,
  clearError: () => void
}
const ErrorSnackContext =  createContext<ErrorSnackCtx | null>( null )

const ErrorSnackProvider = ( { children } ) => {
  const [ error, updateError ] = useState<Error>( { error: '', screen: '' } )
  const clearError = () => {
    updateError( { error: '', screen: '' } )
  }
  return (
    <ErrorSnackContext.Provider value={{ error, updateError, clearError }}>
      {children}
    </ErrorSnackContext.Provider>
  )
}


export { ErrorSnackProvider, ErrorSnackContext }
