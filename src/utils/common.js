import { VIBRATE_PRESS, VIBRATE_ERROR } from '../constants/common'

export const vibrateOnPress = (isError = false) => {
  const canVibrate = navigator.vibrate
  if (canVibrate) {
    navigator.vibrate(isError ? VIBRATE_ERROR : VIBRATE_PRESS)
  } else return
}
