import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function Instructions() {
  const [open, setOpen] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  var absentImg = require('../constants/Images/absent.png')
  var presentImg = require('../constants/Images/present.png')
  var correctImg = require('../constants/Images/correct.png')

  return (
    <div>
      <button className='info' onClick={handleClickOpen}>
        {<InfoOutlinedIcon />}
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          HOW TO PLAY
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Solve the WUZZLE in six tries.</Typography>
          <Typography gutterBottom>
            Each guess must be a valid five-letter word. Hit the return button
            to submit.
          </Typography>
          <Typography gutterBottom>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </Typography>
          <Typography gutterBottom>EXAMPLES :</Typography>
          <Typography gutterBottom>
            <img src={correctImg} />
            <img src={presentImg} />
            <img src={absentImg} />
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}
