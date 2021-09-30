import React, { useEffect, useState } from 'react'
// Material-UI
// Core
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
} from '@material-ui/core'
// Icons
import { Add } from '@material-ui/icons'
// Components
import Menu from '../../../components/menu'
import Footer from '../../../components/footer'
// API
import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    marginTop: 90,
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    margin: 10,
  },
  item: {
    margin: 7,
  },
  modDate: {
    marginTop: 5,
    textAlignLast: 'end',
  },
}))

function createData(_id, number, cnc, plc, ihm, driver, build, line) {
  return { _id, number, cnc, plc, ihm, driver, build, line }
}

const machines = [
  createData(1, 103015, 'CNC', 'PLC', 'IHM', 'Driver', 'Prédio 1', 'KW1'),
  createData(2, 103307, 'CNC2', 'PLC2', 'IHM2', 'Driver2', 'Prédio 1', 'KW1'),
]

export default function Machines() {
  const classes = useStyles()

  const [machine, setMachine] = useState()
  useEffect(() => {
    async function loadMachine() {
      const res = await api.get('/api/machines')
      setMachine(res.data)
    }
  })

  return (
    <div className={classes.root}>
      <Menu title={'Máquinas'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer}>
          <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3} xs={12}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                startIcon={<Add />}
                href='/admin/machines/new'
              >
                Nova Maquina
              </Button>
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  {/* Foreach machine, show a paper with components and date of last modification */}
                  {machines.map((row) => (
                    <Grid sm={10} className={classes.paper} key={row._id}>
                      <Card>
                        <CardActionArea
                          href={'/admin/machine/detail/' + row._id}
                        >
                          <CardContent>
                            <Grid>
                              <Typography variant='h5' gutterBottom>
                                {row.number}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography variant='body1'>
                                CNC:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.cnc}
                                />
                                PLC:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.plc}
                                />
                                IHM:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.ihm}
                                />
                                Driver:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.driver}
                                />
                              </Typography>
                              <Typography variant='body1'>
                                Prédio:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.build}
                                />
                                Linha:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.line}
                                />
                              </Typography>
                            </Grid>
                            <br />
                            <Grid className={classes.modDate}>
                              <Typography variant='caption'>
                                Ultima modificação: 01/07/2021 {}
                              </Typography>
                            </Grid>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Footer />
            </Box>
          </Container>
        </div>
      </main>
    </div>
  )
}
