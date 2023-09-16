import { reducer } from '../provider/state/reducer'
import defaultConfig from '../provider/defaultConfig'
import { renderHook } from '@testing-library/react-hooks'
import { useReducer } from 'react'
import initialState from '../provider/state/initialState'

describe('state', () => {
  it('should return true', async () => {
    const {
      result: {
        current: [state, dispatch]
      }
    } = renderHook(() =>
      useReducer(
        (action: UneeqState, state: any) =>
          reducer(action, state, defaultConfig),
        initialState(defaultConfig)
      )
    )
    // console.log('state', state)
    return true
  })
})
