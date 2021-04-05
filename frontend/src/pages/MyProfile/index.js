import React, { useState } from 'react';
import { 
  Container,
  makeStyles,
  Button,
  Grid,
  TextField,
  Paper,
  Snackbar
} from '@material-ui/core';

import Appbar from '../../components/Appbar';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

const useStyles = makeStyles((theme) => ({
  TextField: {
    width: '100%'
  },
  paper: {
    marginTop: '35px',
    padding: '16px'
  },
}));

export default function MyProfile() {
  const { Logout, user } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const classes = useStyles();

  async function deleteUser() {
    api.delete('/user/'+ user.id);
    Logout();
  }

  async function editUser() {
    api.put('/user/'+ user.id, {
      name: name,
      email: email,
      password: password
    }).then(res => {
      handleClick();
      setMessage(res.data.message);
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
    <div>
      <Appbar path="/" title="Meu perfil" />
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
      <Container maxWidth="md">
        <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12} sm={12}>
              <TextField id="outlined-basic" value={name} onChange={event => setName(event.target.value)} label="Nome completo" variant="outlined" className={classes.TextField} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField id="outlined-basic" value={email} onChange={event => setEmail(event.target.value)} label="E-mail" variant="outlined" className={classes.TextField}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="outlined-basic" value={password} onChange={event => setPassword(event.target.value)} label="Senha" type="password" variant="outlined" className={classes.TextField} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button onClick={editUser} variant="contained" color="primary" disableElevation>Editar perfil</Button>
              <Button onClick={deleteUser} variant="contained" color="secondary" disableElevation style={{ marginLeft: 10 }}>Excluir perfil</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
