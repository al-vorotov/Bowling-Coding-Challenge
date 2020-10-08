
export interface IState {
  action: number[]
  currentlyPins: number
  gamePosition: boolean
  gameEnd: boolean
  goals: number
  pins: number
  stage: number
  total: number
}

export interface IFrame {
  goals1: number
  goals2: number
  total: number
  stage: number
  strike: boolean
}

export interface IStateSetter {
  key: 'action' | 'currentlyPins' | 'gamePosition' | 'gameEnd' | 'goals' | 'pins' | 'stage' | 'total'
  item: number | boolean | number[]
}
