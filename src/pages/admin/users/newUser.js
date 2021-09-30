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

export default function NewUser() {
  const classes = useStyles()

  const [form, setForm] = useState({
    name: '',
    id8: '',
    email: '',
    role: Number,
    shift: Number,
    password: '',
    confirmPassword: '',
    active: Boolean,
  })

  async function handleSubmit() {
    // Confirm if all fields are filled
    if (
      !form.name ||
      !form.id8 ||
      !form.email ||
      !form.role ||
      !form.shift ||
      !form.password
    ) {
      // Not recived some information
      alert('Preencha todos os campos')
    } else {
      const data = {
        name: form.name,
        id8: form.id8,
        email: form.email,
        role: form.role,
        shift: form.shift,
        password: form.password,
      }
      const response = await api.post('/api/users/create', data)

      if (response.status === 200) {
        window.location.href = '/admin/users'
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
                <h2>NOVO USUÁRIO</h2>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      variant='standard'
                      margin='normal'
                      name='email'
                      label='Email Corporativo'
                      fullWidth
                      autoComplete='email'
                      value={form.email}
                      onChange={(e) => setForm(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      variant='standard'
                      margin='normal'
                      name='id8'
                      label='8ID'
                      fullWidth
                      autoComplete='id8'
                      value={form.id8}
                      onChange={(e) => setForm(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='Cargo'>Cargo</InputLabel>
                      <Select
                        required
                        variant='standard'
                        labelId='Cargo'
                        value={form.role}
                        onChange={(e) => setForm(e.target.value)}
                      >
                        <MenuItem value={1}>TI</MenuItem>
                        <MenuItem value={2}>Supervisor</MenuItem>
                        <MenuItem value={3}>Encarregado</MenuItem>
                        <MenuItem value={4}>Técnico</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='Turno'>Turno</InputLabel>
                      <Select
                        required
                        variant='standard'
                        labelId='Turno'
                        value={form.shift}
                        onChange={(e) => setForm(e.target.value)}
                      >
                        <MenuItem value={1}>Manhã</MenuItem>
                        <MenuItem value={2}>Tarde</MenuItem>
                        <MenuItem value={3}>Noturno</MenuItem>
                        <MenuItem value={4}>Administrativo</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      variant='standard'
                      margin='normal'
                      name='password'
                      label='Senha'
                      fullWidth
                      autoComplete='password'
                      type='password'
                      value={form.password}
                      onChange={(e) => setForm(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      variant='standard'
                      margin='normal'
                      name='confirmPassword'
                      label='Confirma senha'
                      fullWidth
                      type='password'
                      value={form.confirmPassword}
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
                      href='/admin/users'
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
