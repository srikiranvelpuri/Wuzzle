import React from 'react'
import Confetti from './Confetti'
import MuiAlert from '@mui/material/Alert'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />
})

const CustomAlert = (props) => {
  const { status, word, tries, alert, content } = props

  const type = status?.includes('I') ? 'warning' : status?.includes('W') ? 'success' : 'error'
  const message = status?.includes('W')
    ? tries > 1
      ? { title: 'Awesome!!', text: 'You solved the wuzzle - ', word: `'${word}' in ${tries} tries` }
      : { title: 'Bravo!!', text: 'You solved the wuzzle - ', word: `'${word}' in a single try` }
    : { title: 'Aw snap', text: 'No more tries left to guess the wuzzle - ', word: `'${word}'` }

  const text = alert ? message : content

  const iconMapping = {
    success: <EmojiEventsIcon fontSize="inherit" />,
    error: <SentimentDissatisfiedIcon fontSize="inherit" />,
  }
  return (
    <Alert variant="" severity={type} sx={{ width: '100%' }} iconMapping={iconMapping}>
      {status === 'WON' && tries <= 3 && <Confetti />}
      {text?.text} <strong>{text?.word}</strong>
    </Alert>
  )
}

export default CustomAlert
