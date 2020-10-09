import React, {
  FC,
  useCallback,
  useEffect,
  useState
} from "react";

import {
  BowlingScoreSheet,
  InputRange,
  CustomButton,
  CustomModal,
  PinsDisplay,
  Scene
} from "../../components";
import {GOALS} from "../../helpers/constant";

import {IFrame, IState, IStateSetter} from "./types";

import styles from './styles.module.scss'

const defaultState = {
  action: [],
  currentlyPins: 10,
  gamePosition: true,
  gameEnd: false,
  goals: 0,
  pins: 0,
  stage: 0,
  total: 0,
}

const defaultFrameScheme = [
  {
    goals1: -1,
    goals2: -1,
    total: 0,
    stage: 0,
    strike: false,
  },
]

const BowlingPlayground: FC = () => {
  const [state, setState] = useState<IState>(defaultState)

  const [frameScheme, setFrameScheme] = useState<IFrame[]>(defaultFrameScheme)

  const stateSetter = useCallback((array: IStateSetter[]) => {
    //this function is intended so that the data does not mutate and it would be easier to set many values in the state
    setState(prevState => {

      array.forEach((elem: IStateSetter) => prevState = {
        ...prevState,
        [elem.key]: elem.item
      })

      return (prevState)
    })
  }, [])

  const frameSchemeSetter = ({goals1, goals2, total, stage, strike}: IFrame) => {

    setFrameScheme((prevState => {
        prevState[stage] = {
          goals1,
          goals2,
          total,
          stage,
          strike
        }
        return ([...prevState])
      }
    ))
  }

  const getFrameTotal = useCallback((currentFrameSchema: IFrame[]) => {

    return currentFrameSchema.reduce((sum, current) => {
      return sum + current.total;
    }, 0)
  }, [])

  const findRemoveActionIndex = (key: number, array: number[]) => {
    const index = array.indexOf(key);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array
  }

  const previousValueMultiplier = useCallback((currentFrameSchema: IFrame[], stateSetterArray: IStateSetter[], currentFrameSchemaActions: number[]) => {

    currentFrameSchema[state.stage - 1] = {
      goals1: currentFrameSchema[state.stage - 1].goals1,
      goals2: currentFrameSchema[state.stage - 1].goals2,
      total: state.pins + currentFrameSchema[state.stage - 1].total,
      stage: state.stage - 1,
      strike: currentFrameSchema[state.stage - 1].strike
    }
    stateSetterArray = [
      ...stateSetterArray,
      {
        key: 'total',
        item: getFrameTotal(currentFrameSchema)
      },
      {
        key: 'action',
        item: currentFrameSchemaActions //this uses for create strike logic
      },
    ]

    if (state.action.includes(state.stage - 2)) {

      currentFrameSchema[state.stage - 2] = {
        goals1: currentFrameSchema[state.stage - 2].goals1,
        goals2: currentFrameSchema[state.stage - 2].goals2,
        total: state.pins + currentFrameSchema[state.stage - 2].total,
        stage: state.stage - 2,
        strike: currentFrameSchema[state.stage - 2].strike
      }

      stateSetterArray = [
        ...stateSetterArray,
        {
          key: 'total',
          item: getFrameTotal(currentFrameSchema)
        },
        {
          key: 'action',
          item: [...findRemoveActionIndex(state.stage - 2, currentFrameSchemaActions)] //this uses for create strike logic
        },
      ]
      setFrameScheme(currentFrameSchema)
      stateSetter(stateSetterArray)
    }

    setFrameScheme(currentFrameSchema)
    stateSetter(stateSetterArray)
  }, [getFrameTotal, state.action, state.pins, state.stage, stateSetter])

  const strikeCase = useCallback(() => {

    let currentFrameSchema = frameScheme
    let stateSetterArray: IStateSetter[] = [
      {
        key: 'pins',
        item: 0 //it uses because we need update pins
      },
      {
        key: 'stage',
        item: state.stage + 1
      },
    ]

    currentFrameSchema[state.stage] = {
      goals1: state.pins,
      goals2: -1,
      total: state.pins,
      stage: state.stage,
      strike: true
    }
    if (state.action.includes(state.stage - 1)) {

      const currentFrameSchemaActions = [...findRemoveActionIndex(state.stage - 1, state.action), state.stage, state.stage]

      previousValueMultiplier(currentFrameSchema, stateSetterArray, currentFrameSchemaActions)
    } else { //this case uses for create 'strike' frame, with default pins and skip stage.

      stateSetterArray = [
        ...stateSetterArray,
        {
          key: 'action',
          item: [...state.action, state.stage, state.stage] //this uses for create strike logic
        },
        {
          key: 'total',
          item: getFrameTotal(currentFrameSchema)
        },
      ]
      setFrameScheme(currentFrameSchema)
      stateSetter(stateSetterArray)
    }
  }, [frameScheme, state.stage, state.pins, state.action, previousValueMultiplier, getFrameTotal, stateSetter])

  const falseCase = useCallback(() => {

    stateSetter(
      [
        {
          key: 'stage',
          item: state.goals === 1 ? state.stage + 1 : state.stage
        },
        {
          key: 'goals',
          item: state.goals === 1 ? 0 : 1
        },
      ]
    )
    frameSchemeSetter(
      {
        goals1: state.goals === 1 ? frameScheme[state.stage].goals1 : 0,
        goals2: 0,
        total: state.goals === 0 ? frameScheme[state.stage].total : 0,
        stage: state.stage,
        strike: false
      }
    )
  }, [frameScheme, state.goals, state.stage, stateSetter])

  const defaultCase = useCallback(() => {

    const handleSpareCaseArray = state.goals === 1 && state.currentlyPins === state.pins
      ? [...state.action, state.stage]
      : state.action
    let currentFrameSchema = frameScheme
    let stateSetterArray: IStateSetter[] = [
      {
        key: 'stage',
        item: state.goals === 1 ? state.stage + 1 : state.stage
      },
      {
        key: 'goals',
        item: state.goals === 1 ? 0 : 1
      },
      {
        key: 'total',
        item: state.total + state.pins
      },
      {
        key: 'currentlyPins',
        item: state.goals === 0
          ? state.currentlyPins - state.pins
          : 10
      },
      {
        key: 'pins',
        item: 0
      },
      {
        key: 'action',
        item: handleSpareCaseArray
      }
    ]
    currentFrameSchema[state.stage] = {
      goals1: state.goals === 0
        ? state.pins
        : frameScheme[state.stage].goals1,
      goals2: state.goals === 1
        ? state.pins
        : 0,
      total: state.goals === 1
        ? frameScheme[state.stage].total + state.pins
        : state.pins,
      stage: state.stage,
      strike: false
    }
    if (state.action.includes(state.stage - 1)) {

      const currentFrameSchemaActions = [...findRemoveActionIndex(state.stage - 1, handleSpareCaseArray)]

      previousValueMultiplier(currentFrameSchema, stateSetterArray, currentFrameSchemaActions)
    } else {

      setFrameScheme(currentFrameSchema)
      stateSetter(stateSetterArray)
    }
  }, [frameScheme, previousValueMultiplier, state.action, state.currentlyPins, state.goals, state.pins, state.stage, state.total, stateSetter])

  const gameEnd = useCallback(() => {

    stateSetter([
      {
        key: 'gameEnd',
        item: true
      },
      {
        key: 'goals',
        item: 0
      },
      {
        key: 'stage',
        item: 0
      }
    ])
  }, [stateSetter])

  const handleKnockPins = useCallback((pins) => {

    switch (pins) {

      case GOALS.STRIKE:
        strikeCase()
        return
      case GOALS.FALSE:
        falseCase()
        return
      default:
        defaultCase()
    }
  }, [defaultCase, falseCase, strikeCase])

  const handleActionButton = (random?: boolean) => {

    if (random) {

      const randomPins = Math.floor(Math.random() * (state.currentlyPins)) + 1;

      stateSetter([{key: 'pins', item: randomPins}])
    } else {
      if (state.goals === 1) {

        stateSetter([{key: 'pins', item: state.currentlyPins}])
      } else {

        stateSetter([{key: 'pins', item: 10}])
      }
    }
  }

  useEffect(() => {

    if ((state.total === 300 || (!frameScheme[frameScheme.length - 1].strike && state.stage === 10)) && !state.gameEnd) {

      gameEnd()
    }
  }, [frameScheme, gameEnd, state])

  return (
    <>
      <CustomModal
        header={state.gamePosition ? 'Bowling Room. Start game?' : 'Game over'}
        open={state.gameEnd || state.gamePosition}
        handleCloseModal={() => stateSetter([{key: 'gamePosition', item: false}])}
      >
        {state.gamePosition
          ? <CustomButton onClick={() => stateSetter([{key: 'gamePosition', item: false}])}>Start game</CustomButton>
          : <>
            <p>You total: {state.total}</p>
            <CustomButton onClick={() => stateSetter([{key: 'gameEnd', item: false}])}>Try Again</CustomButton>
          </>
        }
      </CustomModal>
      {state.gamePosition
        ? <CustomButton onClick={() => stateSetter([{key: 'gamePosition', item: true}])}>Try Again</CustomButton>
        : <div>
          <h1>Bowling Room</h1>
          <h3>Stage: {state.stage > 9 ? 'Bonus game' : state.stage + 1}</h3>
          <Scene currentlyPins={state.currentlyPins}/>
          <div className={styles.pullWrapper}>
            <PinsDisplay pins={state.pins}/>
            <div className={styles.pinsPull}>
              <InputRange
                max={state.currentlyPins}
                onChange={(e: any) => stateSetter([{key: 'pins', item: Number(e.target.value)}])}
                value={state.pins}
              />
              <div className={styles.pinsPull__buttonWrapper}>
                <CustomButton
                  onClick={() => handleActionButton()}
                >
                  {state.goals === 1 ? 'Spare!' : 'Strike!'}
                </CustomButton>
                <CustomButton
                  onClick={() => handleActionButton(true)}
                >
                  Random!
                </CustomButton>
              </div>
            </div>
          </div>
          <div>
            <CustomButton
              onClick={() => handleKnockPins(state.pins)}
            >
              Knock pins
            </CustomButton>

          </div>
          <BowlingScoreSheet frameScheme={frameScheme}/>
        </div>
      }
    </>


  );
}

export default BowlingPlayground;
