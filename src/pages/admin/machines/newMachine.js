import React, { useState, useEffect } from 'react'
// Material-UI
// Core
import {
  Container,
  makeStyles,
  Grid,
  Paper,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Box,
  Switch,
} from '@material-ui/core'
// Icons
import {} from '@material-ui/icons'
// Components
import Menu from '../../../components/menu'
import Footer from '../../../components/footer'
// Api
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
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%',
  },
  switch: {
    color: '#00FF00',
  },
  button: {
    margin: 10,
  },
}))

export default function NewMachine() {
  const classes = useStyles()

  const [form, setForm] = useState({
    number: '',
    model: '',
    manufacturer: Number,
    func: '',
    cnc: Number,
    plc: Number,
    ihm: Number,
    driver: Number,
  })
  const [nc, setNC] = useState([])
  const [plc, setPlc] = useState([])
  const [ihm, setIhm] = useState([])
  const [driver, setDriver] = useState([])
  const [man, setMan] = useState([])

  useEffect(() => {
    async function loadComponents() {
      const nc = await api.get('/api/machine/nc')
      const plc = await api.get('/api/machine/plc')
      const driver = await api.get('/api/machine/driver')
      const ihm = await api.get('/api/machine/ihm')
      const manufacturer = await api.get('/api/manage/manufacturer')

      setNC(nc.data)
      setPlc(plc.data)
      setIhm(ihm.data)
      setDriver(driver.data)
      setMan(manufacturer.data)
    }
  }, [])
  async function handleSubmit() {
    const data = {
      number: form.number,
      model: form.model,
      manufacturer: form.manufacturer,
      func: form.func,
      cnc: form.cnc,
      plc: form.plc,
      ihm: form.ihm,
      driver: form.driver,
    }

    if (
      !form.name ||
      !form.id8 ||
      !form.email ||
      !form.role ||
      !form.shift ||
      !form.password
    ) {
    } else {
      const response = await api.post('/api/machine/create', data)

      if (response.status === 200) {
        window.location.href = '/admin/machines'
      } else {
        alert('Preencha todos os campos')
      }
    }
  }

  return (
    <div className={classes.root}>
      <Menu title={'Cadastro'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>NOVA MÁQUINA</h2>
                <Grid container spacing={3}>
                  {/* Machine Number */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      name='number'
                      label='Numero'
                      margin='normal'
                      fullWidth
                      autoComplete='number'
                      value={form.number}
                      onChange={(e) => setForm(e.target.value)}
                    />
                  </Grid>
                  {/* Machine model */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      name='model'
                      label='Modelo'
                      margin='normal'
                      fullWidth
                      autoComplete='model'
                      value={form.model}
                      onChange={(e) => setForm(e.target.value)}
                    />
                  </Grid>
                  {/* Manufacturer */}
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='manufacturer'>Fabricante</InputLabel>
                      <Select
                        required
                        margin='normal'
                        labelId='manufacturer'
                        value={form.manufacturer}
                        onChange={(e) => setForm(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  {/* CNC */}
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='cnc'>CNC</InputLabel>
                      <Select
                        labelId='cnc'
                        value={form.cnc}
                        onChange={(e) => setForm(e.target.value)}
                      >
                        {/* {form.map((item) => (
                                                <MenuItem value={}>{item.cnc}</MenuItem>
                                            ))} */}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* PLC */}
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='plc'>PLC</InputLabel>
                      <Select
                        labelId='plc'
                        value={form.plc}
                        onChange={(e) => setForm(e.target.value)}
                      >
                        {/* {form.map((item) => (
                                                <MenuItem value={}>{item.plc}</MenuItem>
                                            ))} */}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* IHM */}
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='ihm'>IHM</InputLabel>
                      <Select
                        labelId='ihm'
                        value={form.ihm}
                        onChange={(e) => setForm(e.target.value)}
                      >
                        {/* {form.map((item) => (
                                                <MenuItem value={}>{item.plc}</MenuItem>
                                            ))} */}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* Driver */}
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='driver'>Driver</InputLabel>
                      <Select
                        labelId='driver'
                        value={form.driver}
                        onChange={(e) => setForm(e.target.value)}
                      >
                        {/* {form.map((item) => (
                                                <MenuItem value={}>{item.plc}</MenuItem>
                                            ))} */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant='contained'
                      className={classes.button}
                      onClick={handleSubmit}
                      color='primary'
                    >
                      Salvar
                    </Button>
                    <Button
                      variant='contained'
                      className={classes.button}
                      href='/machines'
                      color='secondary'
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}
