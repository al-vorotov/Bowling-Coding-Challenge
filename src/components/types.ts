import {ChangeEvent, MouseEventHandler, ReactNode} from 'react'
import {IFrame} from "../layouts/BowlingPlayground/types";

export interface ICustomButton {
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
}

export interface IInputRange {
  children?: ReactNode
  max: number
  onChange?: ((event: ChangeEvent<HTMLInputElement>) => void)
  value: number
}

export interface IModalProps {
  children?: ReactNode
  header?: string
  open: boolean
  handleCloseModal: (...args: any[]) => any
}

export interface IBowlingScoreSheet{
  frameScheme :IFrame[]
}

export interface IPinsDisplay{
  pins: number
}
export interface IScene{
  currentlyPins: number
}
