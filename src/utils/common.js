import Clarity from '@microsoft/clarity'
import { VIBRATE_PRESS, VIBRATE_ERROR, CLARITY_PROJECT_ID } from '../constants/common'

export const vibrateOnPress = (isError = false) => {
  const canVibrate = navigator.vibrate
  if (canVibrate) {
    navigator.vibrate(isError ? VIBRATE_ERROR : VIBRATE_PRESS)
  } else return
}

export const initializeClarity = () => {
  Clarity.init(CLARITY_PROJECT_ID)
  Clarity.consent()
}
