import React, { useState } from 'react'
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
// Components
import Menu from '../../../../components/menu'
import Footer from '../../../../components/footer'
// Api
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

export default function NewBuilding() {
  const classes = useStyles()

  const [form, setForm] = useState({
    name: '',
    active: Boolean,
  })

  async function handleSubmit() {
    // Confirm if all fields are filled
    if (!form.name) {
      // Not recived some information
      alert('Preencha todos os campos')
    } else {
      const data = {
        name: form.name,
        active: form.active,
      }
      const response = await api.post('/api/build/building/create', data)

      if (response.status === 200) {
        window.location.href = '/admin/build/buildings'
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
                <h2>NOVO PRÉDIO</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      variant='standard'
                      margin='normal'
                      name='name'
                      label={'Nome'}
                      fullWidth
                      autoComplete='name'
                      value={form.name}
                      onChange={(e) => setForm(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Switch
                      checked
                      value={form.active}
                      // onChange={handleChange}
                      className={classes.switch}
                      defaultChecked
                      color='primary'
                    />
                    Ativo
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
                      href='/admin/build/buildings'
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
