import React from 'react'
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

const CustomizedDialog = (props) => {
  const {
    title,
    theme,
    icon,
    images,
    content,
    action,
    handleActionClick,
    defaultOpen,
    disableClose,
    showIcon,
    showImage,
    actionTitle,
  } = props
  const [open, setOpen] = React.useState(defaultOpen || false)

  const handleIconClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {showIcon && <Button onClick={handleIconClick}>{icon}</Button>}
      <BootstrapDialog
        data-dark={theme}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={disableClose ? null : handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {content?.map((subContent, index) => (
            <Typography key={index} gutterBottom>
              {subContent}
            </Typography>
          ))}
          <Typography gutterBottom>
            {showImage &&
              images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={icon}
                  style={{ height: 'auto', width: 'auto' }}
                />
              ))}
          </Typography>
        </DialogContent>
        {action && (
          <DialogActions>
            <Button className='reset-board' onClick={handleActionClick}>
              {actionTitle}
              {action}
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    </div>
  )
}

export default CustomizedDialog
