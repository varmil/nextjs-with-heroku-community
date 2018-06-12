import { Example } from 'constants/ActionTypes'

export function failure(error) {
  return {
    type: Example.FAILURE,
    error
  }
}

export function increment() {
  return { type: Example.INCREMENT }
}

export function decrement() {
  return { type: Example.DECREMENT }
}

export function reset() {
  return { type: Example.RESET }
}

export function loadData() {
  return { type: Example.LOAD_DATA }
}

export function loadDataSuccess(data) {
  return {
    type: Example.LOAD_DATA_SUCCESS,
    data
  }
}

export function startClock() {
  return { type: Example.START_CLOCK }
}

export function tickClock(isServer) {
  return {
    type: Example.TICK_CLOCK,
    light: !isServer,
    ts: Date.now()
  }
}
