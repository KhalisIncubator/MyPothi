import {
  createContext,
  useContext,
} from 'react'

const LineContext = createContext( { line: '' } )

export { LineContext }


const useLine = () => {
  const LineCtx = useContext( LineContext )

  return LineCtx.line
}

export {
  useLine,
}
