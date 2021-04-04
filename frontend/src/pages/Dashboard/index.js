import React from 'react';
import {useAuth} from '../../contexts/auth';
import { Link } from "react-router-dom";

import { 
  makeStyles, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  Container, 
  AppBar,
  Toolbar
} from '@material-ui/core';
import Appbar from '../../components/Appbar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#f8f8f8'
  },
  appbar: {
    boxShadow: 'none',
    backgroundColor: '#fff',
    color: '#120a8f',
    borderBottom: '2px solid #f1f1f4'
  },
  link: {
    color: '#120a8f'
  },
  toolbar: {
    paddingLeft: 0,
  },
  btnLogin: {
    position: 'absolute',
    right: 0,
  }
}));

export default function Dashboard() {
  const { Logout, user } = useAuth();
  const classes = useStyles();

  async function handleLogout() {
    Logout();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Container maxWidth="md">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">
              Dashboard Urbis
            </Typography>
            <div className={classes.btnLogin}>
              <Button onClick={handleLogout} color="secondary">Sair</Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md">
        
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h1>Seja bem vindo, {user.name}!</h1>
          </Grid>

          <Grid item md={4} xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Minhas Tarefas
                </Typography> <br/>
                <Typography variant="body2" component="p">
                  Gerencie suas tarefas facilmente <br/> com apenas alguns cliques
                </Typography>
                <br/>
                <Link to="/task">
                  <Button size="medium" color="primary">Listar</Button>
                </Link>
                <Link to="/create/task">
                  <Button size="medium" color="secondary">Cadastrar</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={4} xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Meu perfil
                </Typography> <br/>
                <Typography variant="body2" component="p">
                  Gerencie suas tarefas facilmente <br/> com apenas alguns cliques
                </Typography>
                <br/>
                <Link to="/task">
                  <Button size="medium" color="primary">Ver perfil</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        
        </Grid>
      </Container>

    </div>
  );
}
