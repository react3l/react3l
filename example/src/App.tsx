import React from 'react'
import {countingReducer, CountingReducer, CountingReducerActionType, useEffectSubscription} from '@react3l/common';
import {Axios} from '@react3l/axios-observable';

const App = () => {
  const [count, dispatch] = React.useReducer<CountingReducer>(countingReducer, 0)

  useEffectSubscription(() => Axios.get('https://www.facebook.com').subscribe(() => {
  }, () => {
    dispatch({
      type: CountingReducerActionType.INCREASE,
    })
  }))

  return (
    <div className="container">
      {count}
    </div>
  )
}

export default App;
