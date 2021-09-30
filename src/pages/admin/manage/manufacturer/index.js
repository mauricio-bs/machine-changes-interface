import React, { useState, useEffect } from 'react'
// Material-UI
// Core
import {
  Container,
  makeStyles,
  Grid,
  Paper,
  Box,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Tooltip,
} from '@material-ui/core'
// Icons
import { Delete, Edit, Add, Visibility } from '@material-ui/icons'
// Components
import Menu from '../../../../components/menu'
import Footer from '../../../../components/footer'
// Api
import api from '../../../../services/api'

// Stylesheet
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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    margin: 10,
    backgroundColor: 'SlateBlue',
    color: 'white',
  },
  table: {
    minWidth: 650,
  },
  ativo: {
    backgroundColor: 'SpringGreen',
  },
  inativo: {
    backgroundColor: 'Crimson',
    color: 'white',
  },
  editar: {
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'DodgerBlue',
  },
  deletar: {
    backgroundColor: 'red',
  },
  relacoes: {
    backgroundColor: 'CadetBlue',
  },
}))

function createData(id, name, email, phone) {
  return { id, name, email, phone }
}

const rows = [
  createData(1, 'Siemens', 'email@siemens.com', '(11)22336-4455'),
  createData(2, 'Fanuc', 'email@fanuc.com', '(44)99554-3321'),
  createData(3, 'Marposs', 'email@marposs.com', '(55)33520-4318'),
  createData(4, 'Altus', 'email@altus.com', '(77)53341-5453'),
]

export default function ManufacturerList() {
  const classes = useStyles()

  const [man, setMan] = useState([])

  useEffect(() => {
    async function loadMan() {
      const response = await api.get('/api/manage/manufacturers')
      setMan(response.data)
    }
    loadMan()
  }, [])

  async function handleDelete({ _id }) {
    if (window.confirm('Deseja realmente excluir este item?')) {
      const result = await api.delete('/api/manage/manufacturers/delete/' + _id)
      if (result.status === 204) {
        window.location.href = ''
      } else {
        alert('Ocorreu um erro interno, favor tente novamente mais tarde')
      }
    }
  }

  return (
    <div className={classes.root}>
      <Menu title={'Fabricantes'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3} xs={12}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              startIcon={<Add />}
              href='/admin/manage/manufacturers/new'
            >
              Novo Fabricante
            </Button>
          </Grid>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Lista de Fabricantes</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label='simple'>
                        <TableHead>
                          <TableRow>
                            <TableCell align='center'>Nome</TableCell>
                            {/* <TableCell align="center">Data de cadastro</TableCell> */}
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Telefone</TableCell>
                            <TableCell align='center'>Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row._id}>
                              {/* Name Collum */}
                              <TableCell
                                align='center'
                                component='th'
                                scope='row'
                              >
                                {row.name}
                              </TableCell>
                              {/* Created at */}
                              {/* <TableCell align='center'>
                                                                {new Date(row.createdAt).toLocaleDateString('pt-br')}
                                                            </TableCell> */}
                              {/* Email collum */}
                              <TableCell align='center'>{row.email}</TableCell>
                              {/* Phone collum */}
                              <TableCell align='center'>{row.phone}</TableCell>
                              {/* Options */}
                              <TableCell align='center'>
                                {/* View More */}
                                <Tooltip title='Contatos'>
                                  <Fab
                                    className={classes.relacoes}
                                    color='primary'
                                    size='small'
                                    href={
                                      ('/admin/manage/manufacturers/contatcts',
                                      row.name)
                                    }
                                  >
                                    <Visibility />
                                  </Fab>
                                </Tooltip>
                                {/* Edit */}
                                <Tooltip title='Editar'>
                                  <Fab
                                    className={classes.editar}
                                    color='primary'
                                    size='small'
                                    aria-label='edit'
                                    href={
                                      '/admin/manage/manufacturers/update/' +
                                      row._id
                                    }
                                  >
                                    <Edit />
                                  </Fab>
                                </Tooltip>
                                {/* Delete */}
                                <Tooltip title='Deletar'>
                                  <Fab
                                    className={classes.deletar}
                                    color='secondary'
                                    size='small'
                                    aria-label='delete'
                                    onClick={() => handleDelete(row._id)}
                                  >
                                    <Delete />
                                  </Fab>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
