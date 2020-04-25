import { Observable } from 'rxjs';
import { useState, useEffect } from 'react';

const useObservable = (
  observable: Observable<any>,
  initial: any,
  dependencies: any[] = [],
) => {
  const [ state, setState ] = useState( initial );

  useEffect( () => {
    const sub = observable.subscribe( setState );

    return sub.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies );
  return state;
};

const useObservableFunc = (
  observable: ( ...args: any[] ) => Observable<any>,
  initial: any,
  funcParams: any[] = [],
  dependencies: any[] = [],
) => {
  const [ state, setState ] = useState( initial );

  useEffect( () => {
    const sub = observable( ...funcParams ).subscribe( setState );
    return () => {
      sub.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies );
  return state;
};


export { useObservable, useObservableFunc };
