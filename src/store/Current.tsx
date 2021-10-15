import React, { createContext, ReactNode, useContext, useState } from 'react'


type ContextValues = {
  currentPothi: string,
  updatePothi: ( ( next: string ) => void ),
}
const CurrentContext = createContext<ContextValues>( { currentPothi: '', updatePothi: () => null } )


const CurrentProvider = ( { children }: {children: ReactNode} ) => {
  const [ currentPothi, setPothi ] = useState<string>( '' )
  const updatePothi = ( next: string ) => {
    setPothi( next )
  }

  return (
    <CurrentContext.Provider value={{ currentPothi, updatePothi }}>
      {children}
    </CurrentContext.Provider>
  )
}

const useCurrentState = (): [string, ( next: string ) => void] => {
  const { currentPothi, updatePothi } = useContext( CurrentContext )!

  return [ currentPothi, updatePothi ]
}

export { CurrentContext, CurrentProvider, useCurrentState }
