import { useState, useEffect } from 'react'
import { Observable, observable } from 'rxjs' 

export const useObservable = <T>( observableFunc: (...args: any[] ) => Observable<T>, initialValue: T, dependencies: any[] = [] ) => {
  const [ state, setState ] = useState( initialValue )
  useEffect( () => {
    const sub = observableFunc().subscribe( setState )
    return () => {
      sub.unsubscribe()
    }
  }, dependencies )
  return [ state ]
}
