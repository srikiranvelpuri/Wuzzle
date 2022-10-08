import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import PropTypes from 'prop-types'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Divider } from '@mui/material'

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
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
  const { title, icon, content, component, defaultOpen, actionTitle, handleActionClick } = props
  const [open, setOpen] = useState(defaultOpen || false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xxs'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>{icon}</Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {content?.map((subcontent, key) => (
              <li key={key}>{subcontent}</li>
            ))}
          </DialogContentText>
          {component}
          {actionTitle && (
            <DialogActions>
              <IconButton size="xs" onClick={handleActionClick}>
                {actionTitle}
              </IconButton>
            </DialogActions>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default CustomizedDialog
