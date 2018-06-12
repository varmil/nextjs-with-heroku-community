import { Example } from 'constants/ActionTypes'

const initialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Example.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      }

    case Example.INCREMENT:
      return {
        ...state,
        ...{ count: state.count + 1 }
      }

    case Example.DECREMENT:
      return {
        ...state,
        ...{ count: state.count - 1 }
      }

    case Example.RESET:
      return {
        ...state,
        ...{ count: initialState.count }
      }

    case Example.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.data }
      }

    case Example.TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.ts, light: !!action.light }
      }

    default:
      return state
  }
}
