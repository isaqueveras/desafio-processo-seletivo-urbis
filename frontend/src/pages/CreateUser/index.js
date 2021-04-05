import React, { useState } from 'react';
import {useAuth} from '../../contexts/auth';
import { Link } from "react-router-dom";

import { 
  Button, 
  Container, 
  CssBaseline, 
  makeStyles, 
  Snackbar, 
  TextField, 
  Typography,
} from '@material-ui/core';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(2, 0, 2),
  },
  textcenter: {
    textAlign: 'center',
    fontSize: 16
  }
}));

export default function CreateUser() {
  const { Login, Logout } = useAuth();
  const classes = useStyles();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  function handleSignIn() {
    api.post('/user', {
      name: name,    
      email: email,    
      password: password,    
    }).then(res => {
      handleClick();
      if (res.status === 200) setMessage("Conta criada com sucesso! entre com seus dados");
      setName('');
      setEmail('');
      setPassword('');
    }).catch(error => {
      handleClick();
      setMessage("Não foi possivel cadastrar sua conta! tente novamente");
    });
  }

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackBar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Urbis
        </Typography>
        <Typography className={classes.textcenter} component="h1" variant="h5">
          Crie uma conta para você gerenciar suas tarefas
        </Typography>
        <form className={classes.form}>
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            autoComplete="email"
            autoFocus
            value={name} 
            onChange={event => setName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            value={email} 
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Senha"
            type="password"
            id="password"
            required
            autoComplete="current-password"
            value={password} 
            onChange={event => setPassword(event.target.value)}
          />
          {name && email && password != '' ? (
            <Button
              onClick={handleSignIn}
              margin="normal"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
            >
              Criar minha conta
            </Button>
          ) : (
            <Button
              margin="normal"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
              disabled
            >
              Criar minha conta
            </Button>
          )}
          

          <Link to="/" variant="body2">
            {"Já tem uma conta? entre aqui"}
          </Link>
        </form>
      </div>
    </Container>
  );
}