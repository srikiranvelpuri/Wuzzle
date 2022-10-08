import React from 'react'
import CustomizedDialog from './CustomizedDialog'
import { Container, Typography } from '@mui/material'
import Example from './Example'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { EXAMPLE_ABSENT, EXAMPLE_CORRECT, EXAMPLE_PRESENT } from '../constants/common'

const Instructions = (props) => {
  const content = [
    'Solve the WUZZLE in six tries,',
    'Each guess must be a valid five-letter word,',
    'Hit the return button to submit,',
    'After each guess, the color of the tiles will change to show how close your guess was to the word.',
    'EXAMPLES :',
  ]

  const ExampleComponent = () => {
    return (
      <>
        <Container maxWidth="xs">
          <Example word={EXAMPLE_CORRECT} value="correct" index={0} />
          <Typography variant="caption">
            <strong>A</strong> is in the word and in the correct spot.
          </Typography>
        </Container>
        <Container maxWidth="xs">
          <Example word={EXAMPLE_PRESENT} value="present" index={1} />
          <Typography variant="caption">
            <strong>P</strong> is in the word but in the wrong spot.
          </Typography>
        </Container>
        <Container maxWidth="xs">
          <Example word={EXAMPLE_ABSENT} value="absent" index={2} />
          <Typography variant="caption">
            <strong>S</strong> is not in the word in any spot.
          </Typography>
        </Container>
      </>
    )
  }

  const title = 'HOW TO PLAY '

  return (
    <div className="info">
      <CustomizedDialog
        icon={<HelpOutlineIcon />}
        title={title}
        content={content}
        component={<ExampleComponent />}
        defaultOpen
      />
    </div>
  )
}
export default Instructions
