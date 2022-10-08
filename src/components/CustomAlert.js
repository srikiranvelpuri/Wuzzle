import React from 'react'
import MuiAlert from '@mui/material/Alert'
import Confetti from './Confetti'
import { AlertTitle } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />
})

const CustomAlert = (props) => {
  const { status, word, tries, alert, content } = props

  const type = status?.includes('W') ? 'success' : 'warning'
  const message = status?.includes('W')
    ? tries > 1
      ? { title: 'Awesome!!', text: 'You solved the wuzzle - ', word: `'${word}' in ${tries} tries 🥳` }
      : { title: 'Bravo!!', text: 'You solved the wuzzle - ', word: `'${word}' in a single try 😮` }
    : { title: 'Aw snap', text: 'No more tries left to guess the wuzzle - ', word: `'${word}' 🥲` }

  const text = alert ? message : content

  return (
    <Alert variant="" severity={type} sx={{ width: '100%' }}>
      {text?.title && <AlertTitle>{text?.title}</AlertTitle>}
      {status === 'WON' && <Confetti />}
      {text?.text} <strong>{text?.word}</strong>
    </Alert>
  )
}

export default CustomAlert
