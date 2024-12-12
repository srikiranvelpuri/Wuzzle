import React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import GitHubIcon from '@mui/icons-material/GitHub'
import MenuIcon from '@mui/icons-material/Menu'
import Toggle from './Toggle'
import { Divider, IconButton, ListItemButton } from '@mui/material'

const CustomDrawer = (props) => {
  const { resetBoard, setDark, isDark, defaultOpen } = props
  const [state, setState] = React.useState(defaultOpen || false)
  const isMobile = typeof window.orientation !== 'undefined'
  const drawPos = 'right'

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
        <IconButton onClick={resetBoard}>
          <RestartAltIcon />
        </IconButton>
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
      </List>
      <List style={{ position: 'absolute', bottom: 0, width: 250 }}>
        <p
          style={{
            all: 'unset',
            display: 'revert',
            textAlign: 'center',
            fontSize: '0.8rem',
          }}
        >
          v1.2.0
        </p>
        <Divider />
        <ListItemButton onClick={() => window.open('https://github.com/srikiranvelpuri', '_blank')}>
          <GitHubIcon />
          <span style={{ fontSize: '.75rem', paddingLeft: '5px' }}>
            Developed by <strong>Srikiran Velpuri</strong>
          </span>
        </ListItemButton>
      </List>
    </Box>
  )
  return (
    <div>
      <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer anchor={drawPos} open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </div>
  )
}

export default CustomDrawer
