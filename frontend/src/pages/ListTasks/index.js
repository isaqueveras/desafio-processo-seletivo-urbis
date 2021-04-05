import React, { useEffect, useState } from "react";
import { 
  Button,
  Container, 
  makeStyles, 
  Snackbar, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
} from "@material-ui/core";
import api from "../../services/api";
import Appbar from "../../components/Appbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#f8f8f8',
    padding: '0px',
    margin: '0px'
  },
  tableHead: {
    backgroundColor: '#ddd',
  }
}));

export default function ListTasks() {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const classes = useStyles();

  function listTasks() {
    api.get('/task/'+ user.id).then(res => { setData(res.data) });
  }

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackBar(false);
  };

  useEffect(() => {
    listTasks();
  }, []);

  function onChangeConcluded(id, concluded) {
    api.put('/task/' + id, {
      isConcluded: !concluded
    }).then(res => {
      handleClick();
      setMessage(res.data.message);
      listTasks();
    }).catch(error => {
      setMessage(error.data.message);
    });
  }

  function deleteTask(id) {
    api.delete('/task/'+ id).then(res => {
      handleClick();
      setMessage(res.data.message);
      listTasks();
    }).catch(error => {
      setMessage(error.data.message);
    });
  }

  return (
    <div className={classes.root}>
      <Appbar path="/" title="Lista de tarefas" />
      <br/>

      <Container maxWidth="md">
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openSnackBar}
          autoHideDuration={2000}
          onClose={handleClose}
          message={message}
          action={
            <Button color="secondary" size="small" onClick={handleClose}>
              Fechar
            </Button>
          }
        />

        <div style={{ width: '100%' }}>
          <Link to="/create/task"><Button color="primary" variant="contained" disableElevation>Cadastrar</Button></Link>
          <br/><br/>

          <TableContainer style={{ backgroundColor: '#fff' }}>
            <Table className={classes.table} aria-label="table of tasks">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Prioridade</TableCell>
                  <TableCell>Escritor</TableCell>
                  <TableCell>Foi concluído?</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.title}</TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell>{row.user.name}</TableCell>
                    <TableCell>{row.isConcluded === true ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>
                      <Button onClick={() => onChangeConcluded(row.id, row.isConcluded)} color="primary">{row.isConcluded === true ? 'Desmarcar' : 'Finalizar'}</Button>
                      <Link to={`/task/${row.id}`}>
                        <Button>Editar</Button>
                      </Link>
                      <Button onClick={() => deleteTask(row.id)} color="secondary">Excluir</Button>  
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>

    </div>
  );
}
