import React, { useState } from 'react';
import {useAuth} from '../../contexts/auth';

import { 
  Button, 
  Container, 
  CssBaseline, 
  Link, 
  makeStyles, 
  Snackbar, 
  TextField, 
  Typography,
  Alert
} from '@material-ui/core';

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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const { Login, Logout } = useAuth();
  const classes = useStyles();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  async function handleSignIn() {
    const response = await Login({ email: email, password: password });
    if (response != 200) {
      handleClick();
      setMessage("Email ou senha invalida");
      Logout();
    }
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
        <Typography component="h1" variant="h5">
          Entre com suas credenciais
        </Typography>
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
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
          
          <Button
            onClick={handleSignIn}
            margin="normal"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>

          <Link href="#" variant="body2">
            {"Ainda não tem uma conta? crie aqui"}
          </Link>
        </form>
      </div>
    </Container>
  );
}