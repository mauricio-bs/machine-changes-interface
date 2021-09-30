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
import Menu from '../../../../components/menu'
import Footer from '../../../../components/footer'
// API
import api from '../../../../services/api'

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

function createData(_id, name, start, end, sponsor) {
  return { _id, name, start, end, sponsor }
}

const shifts = [
  createData(1, 'Administrativo', '8:00', '17:00', 'Rodrigo F'),
  createData(2, 'Manhã', '5:00', '13:00', 'Paulo Codogno'),
  createData(3, 'Tarde', '13:30', '22:00', 'Alessandro M'),
]

export default function Machines() {
  const classes = useStyles()

  const [shift, setShift] = useState()
  useEffect(() => {
    async function loadShift() {
      const res = await api.get('/api/manage/shift')
      setShift(res.data)
    }
    loadShift()
  })

  return (
    <div className={classes.root}>
      <Menu title={'Turnos'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer}>
          <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3} xs={12}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                startIcon={<Add />}
                href='/admin/manage/shift/new'
              >
                Novo Turno
              </Button>
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  {/* Foreach machine, show a paper with components and date of last modification */}
                  {shifts.map((row) => (
                    <Grid sm={6} className={classes.paper}>
                      <Card key={row._id}>
                        <CardActionArea href={'/admin/shift/detail/' + row._id}>
                          <CardContent>
                            <Grid>
                              <Typography variant='h5' gutterBottom>
                                {row.number}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography variant='body1'>
                                Turno:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.name}
                                />
                                Encarregado:
                                <Chip
                                  color='secondary'
                                  className={classes.item}
                                  label={row.sponsor}
                                />
                              </Typography>
                              <Typography variant='body1'>
                                Inicio:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.start}
                                />
                                Fim:
                                <Chip
                                  color='primary'
                                  className={classes.item}
                                  label={row.end}
                                />
                              </Typography>
                            </Grid>
                            <br />
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
