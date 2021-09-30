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
// Icons
import {} from '@material-ui/icons'
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

export default function NewMachine() {
  const classes = useStyles()

  const [name, setName] = useState('')
  async function handleSubmit() {
    if (!name) {
    } else {
      const response = await api.post('/api/manage/role/create', name)

      if (response.status === 200) {
        window.location.href = '/admin/manage/role'
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
                <h2>NOVO CARGO</h2>
                <Grid container spacing={3}>
                  {/* Machine Number */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      name='name'
                      label='Nome'
                      margin='normal'
                      fullWidth
                      autoComplete='number'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
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
                      href='/admin/manage/role'
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
