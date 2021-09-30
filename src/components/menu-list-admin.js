import React, { useState } from 'react'
// Core
import {
  makeStyles,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
// Icons
import {
  Dashboard,
  SwapHorizontalCircle,
  BusinessSharp,
  Build,
  ExpandLess,
  ExpandMore,
  Settings,
  VideoLabel,
  Web,
  Dvr,
  AccountTree,
  Person,
  Apartment,
  HomeWork,
  LinearScale,
  BusinessCenter,
  QueryBuilder,
  SupervisedUserCircle,
  Contacts,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export default function AdminMenu() {
  const classes = useStyles()

  // Open/Close components list
  const [compOpen, setCompOpen] = useState(false)
  const handleComponentsNest = () => {
    setCompOpen(!compOpen)
  }

  // Open/Close Build list
  const [buildOpen, setBuildOpen] = useState(false)
  const handleBuildNest = () => {
    setBuildOpen(!buildOpen)
  }
  // Open/Close Management list
  const [manOpen, setManOpen] = useState(false)
  const handleManNest = () => {
    setManOpen(!manOpen)
  }

  return (
    <div>
      <ListItem button component='a' href={'/admin'}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SwapHorizontalCircle />
        </ListItemIcon>
        <ListItemText primary='Modificações' />
      </ListItem>
      <ListItem button component='a' href='/admin/users'>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary='Usuários' />
      </ListItem>
      <ListItem button onClick={handleManNest}>
        <ListItemIcon>
          <BusinessCenter />
        </ListItemIcon>
        <ListItemText primary='Gerenciamento' />
        {manOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={manOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem
            button
            component='a'
            href={'/admin/manage/shift'}
            className={classes.nested}
          >
            <ListItemIcon>
              <QueryBuilder />
            </ListItemIcon>
            <ListItemText primary='Turnos' />
          </ListItem>
          <ListItem
            button
            component='a'
            href={'/admin/manage/role'}
            className={classes.nested}
          >
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText primary='Cargos' />
          </ListItem>
          <ListItem
            button
            component='a'
            href={'/admin/manage/manufacturers'}
            className={classes.nested}
          >
            <ListItemIcon>
              <Contacts />
            </ListItemIcon>
            <ListItemText primary='Fabricantes' />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button component='a' href='/machines'>
        <ListItemIcon>
          <BusinessSharp />
        </ListItemIcon>
        <ListItemText primary='Maquinas' />
      </ListItem>
      <ListItem button onClick={handleComponentsNest}>
        <ListItemIcon>
          <Build />
        </ListItemIcon>
        <ListItemText primary='Componentes' />
        {compOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={compOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Dvr />
            </ListItemIcon>
            <ListItemText primary='CNC' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AccountTree />
            </ListItemIcon>
            <ListItemText primary='PLC' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <VideoLabel />
            </ListItemIcon>
            <ListItemText primary='IHM' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary='Drive' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Web />
            </ListItemIcon>
            <ListItemText primary='Software' />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleBuildNest}>
        <ListItemIcon>
          <Apartment />
        </ListItemIcon>
        <ListItemText primary='Planta' />
        {buildOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={buildOpen} timeout='auto' unmountOnExit>
        <ListItem
          button
          className={classes.nested}
          component='a'
          href='/admin/build/buildings'
        >
          <ListItemIcon>
            <HomeWork />
          </ListItemIcon>
          <ListItemText primary='Prédios' />
        </ListItem>
        <ListItem
          button
          className={classes.nested}
          component='a'
          href='/admin/build/buildings/line'
        >
          <ListItemIcon>
            <LinearScale />
          </ListItemIcon>
          <ListItemText primary='Linhas' />
        </ListItem>
      </Collapse>
    </div>
  )
}
