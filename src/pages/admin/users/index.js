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
import { Delete, Edit, Add } from '@material-ui/icons'
// Components
import Menu from '../../../components/menu'
import Footer from '../../../components/footer'
// Api
import api from '../../../services/api'

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
    backgroundColor: 'DodgerBlue',
  },
  deletar: {
    marginLeft: 8,
    backgroundColor: 'red',
  },
}))

function createData(_id, id8, name, email, role, active) {
  return { _id, id8, name, email, role, active }
}

const rows = [
  createData(1, 12345678, 'Administrador', 'admin@teste.com', 'TI', true),
  createData(2, 87654321, 'Teste', 'teste@teste.com', 'Técnico', false),
]

export default function UsersList() {
  const classes = useStyles()

  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/api/users')
      setUsers(response.data)
    }
  }, [])

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este usuario?')) {
      const result = await api.delete('/api/users/' + id)
      if (result.status === 200) {
        window.location.href = '/admin/users'
      } else {
        alert('Ocorreu um erro interno, favor tente novamente mais tarde')
      }
    }
  }

  return (
    <div className={classes.root}>
      <Menu title={'Usuários'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3} xs={12}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              startIcon={<Add />}
              href='/admin/users/register'
            >
              Novo Usuario
            </Button>
          </Grid>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Lista de Usuarios</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label='simple'>
                        <TableHead>
                          <TableRow>
                            <TableCell align='center'>8ID</TableCell>
                            <TableCell align='center'>Nome</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Cargo</TableCell>
                            {/* <TableCell align="center">Data de cadastro</TableCell> */}
                            <TableCell align='center'>Ativo</TableCell>
                            <TableCell align='center'>Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row._id}>
                              {/* 8ID Collum */}
                              <TableCell
                                align='center'
                                component='th'
                                scope='row'
                              >
                                {row.id8}
                              </TableCell>
                              {/* Name of users Collum */}
                              <TableCell align='center'>{row.name}</TableCell>
                              {/* Email Collum */}
                              <TableCell align='center'>{row.email}</TableCell>
                              {/* Role collum */}
                              <TableCell align='center'>{row.role}</TableCell>
                              {/* Created at */}
                              {/* <TableCell align='center'>
                                                                {new Date(row.createdAt).toLocaleDateString('pt-br')}
                                                            </TableCell> */}
                              <TableCell align='center'>
                                {row.active ? (
                                  <Chip
                                    label='ATIVO'
                                    className={classes.ativo}
                                  />
                                ) : (
                                  <Chip
                                    label='INATIVO'
                                    className={classes.inativo}
                                  />
                                )}
                              </TableCell>
                              {/* Options */}
                              <TableCell align='center'>
                                {/* Edit */}
                                <Tooltip title='Editar'>
                                  <Fab
                                    className={classes.editar}
                                    color='primary'
                                    size='small'
                                    aria-label='edit'
                                    href={'/admin/users/update/' + row._id}
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
