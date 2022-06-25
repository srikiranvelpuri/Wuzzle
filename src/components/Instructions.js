import React from 'react'
import CustomizedDialog from './CustomizedDialog'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const Instructions = (props) => {
  const { theme } = props
  var lightImg = require('../constants/Images/lightMode.png')
  var darkImg = require('../constants/Images/darkMode.png')

  const images = [theme ? darkImg : lightImg]
  const content = [
    '- Solve the WUZZLE in six tries,',
    '- Each guess must be a valid five-letter word,',
    '- Hit the return button to submit,',
    '- After each guess, the color of the tiles will change to show how close your guess was to the word.',
    'EXAMPLES :',
  ]

  const title = 'HOW TO PLAY '

  return (
    <div className='info'>
      <CustomizedDialog
        theme={theme}
        showIcon
        showImage
        defaultOpen
        title={title}
        images={images}
        content={content}
        icon={<InfoOutlinedIcon />}
      />
    </div>
  )
}
export default Instructions
