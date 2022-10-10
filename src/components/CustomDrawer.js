import React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import GitHubIcon from '@mui/icons-material/GitHub'
import MenuIcon from '@mui/icons-material/Menu'
import Toggle from './Toggle'
import { Divider, IconButton, Typography } from '@mui/material'

const CustomDrawer = (props) => {
  const { resetBoard, setDark, isDark, defaultOpen } = props
  const [state, setState] = React.useState(defaultOpen || false)
  const isMobile = typeof window.orientation !== 'undefined'
  const drawPos = isMobile ? 'bottom' : 'right'

  React.useEffect(() => {
    setState(defaultOpen)
  }, [defaultOpen])

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState(open)
  }

  const componentMapper = {
    Theme: {
      cond: isDark,
      component: () => (
        <Toggle
          handleChange={() => {
            setDark(!isDark)
            localStorage.setItem('dark_mode', !isDark)
          }}
          val={isDark}
        />
      ),
    },
    Reset: {
      cond: defaultOpen,
      component: () => (
        <Button onClick={resetBoard}>
          <RestartAltIcon />
        </Button>
      ),
    },
  }

  const locale = (text, cond) =>
    ({
      Theme: cond ? 'Dark Theme' : 'Light Theme',
      Reset: cond ? 'Play Again ?' : 'Reset Game',
    }[text])

  const list = () => (
    <Box sx={{ width: drawPos === 'bottom' ? 'auto' : 250 }} role="presentation">
      <List>
        {Object.keys(componentMapper).map((text, index) => (
          <ListItem key={index} onClick={toggleDrawer(false)}>
            <ListItemText primary={locale(text, componentMapper[text].cond)} />
            {componentMapper[text].component()}
          </ListItem>
        ))}
        <Divider />
        <IconButton onClick={() => (window.location.href = 'https://github.com/srikiran1707')}>
          <GitHubIcon />
          <span style={{ fontSize: '.75rem', paddingLeft: '5px' }}>
            Developed by <strong>Srikiran Velpuri</strong>
          </span>
        </IconButton>
      </List>
    </Box>
  )
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <SwipeableDrawer anchor={drawPos} open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </div>
  )
}

export default CustomDrawer
