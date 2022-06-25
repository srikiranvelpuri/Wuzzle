import React from 'react'
import CustomizedDialog from './CustomizedDialog'
import RotateRight from '@mui/icons-material/RotateRight'

const TryAgain = (props) => {
  const { resetBoard, status, word, tries } = props
  const title = status?.includes('W')
    ? 'Congratulations You Won'
    : 'Hard Luck You Lost'
  const content = [
    status?.includes('W')
      ? tries > 1
        ? `Awesome!!, you solved the wuzzle - '${word}' in ${tries} tries 🥳`
        : `Bravo!!, you solved the wuzzle - '${word}' in a single try 😮`
      : `Aw snap, you reached the maximum tries to solve the wuzzle - '${word}' 🥲`,
    'Do you want to try again 🥺 ? ',
  ]
  return (
    <CustomizedDialog
      handleActionClick={resetBoard}
      title={title}
      content={content}
      actionTitle={'Try Again'}
      action={<RotateRight />}
      defaultOpen
    />
  )
}

export default TryAgain
