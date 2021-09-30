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

function createData(_id, name, active) {
  return { _id, name, active }
}

const rows = [
  createData(1, 'Prédio 1', true),
  createData(2, 'Prédio 2', false),
  createData(3, 'Prédio 3', true),
  createData(4, 'Prédio 4', true),
]

export default function BuildingList() {
  const classes = useStyles()

  const [build, setBuild] = useState([])

  useEffect(() => {
    async function loadBuildings() {
      const response = await api.get('/api/buildings')
      setBuild(response.data)
    }
    loadBuildings()
  }, [])

  async function handleDelete({ _id }) {
    if (window.confirm('Deseja realmente excluir este usuario?')) {
      const result = await api.delete('/api/build/building/' + _id)
      if (result.status === 200) {
        window.location.href = '/admin/build/buildings'
      } else {
        alert('Ocorreu um erro interno, favor tente novamente mais tarde')
      }
    }
  }

  return (
    <div className={classes.root}>
      <Menu title={'Prédios'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3} xs={12}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              startIcon={<Add />}
              href='/admin/build/buildings/new'
            >
              Novo Prédio
            </Button>
          </Grid>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Lista de Prédios</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label='simple'>
                        <TableHead>
                          <TableRow>
                            <TableCell align='center'>Nome</TableCell>
                            {/* <TableCell align="center">Data de cadastro</TableCell> */}
                            <TableCell align='center'>Status</TableCell>
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
                                {row.name}
                              </TableCell>
                              {/* Created at */}
                              {/* <TableCell align='center'>
                                                                {new Date(row.createdAt).toLocaleDateString('pt-br')}
                                                            </TableCell> */}
                              {/* Active */}
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
                                {/* View More */}
                                <Tooltip title='Ver linhas de produção'>
                                  <Fab
                                    className={classes.relacoes}
                                    color='primary'
                                    size='small'
                                    href={'/admin/build/building/relationship'}
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
                                      '/admin/build/building/update/' + row._id
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
