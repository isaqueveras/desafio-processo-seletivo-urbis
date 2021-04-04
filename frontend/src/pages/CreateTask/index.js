import { Button, Container, Grid, makeStyles, Paper, Snackbar, TextField } from "@material-ui/core";
import { useState } from "react";
import Appbar from "../../components/Appbar";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '25px 16px',
  },
  textfildTitle: {
    marginRight: 15, width: '100%' 
  },
  textfildPriority: {
    width: '100%'
  }
}));

export default function CreateTask() {
  const { user } = useAuth();
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  function create() {
    api.post('/task/', { 
      title: title, priority: priority, id_user: user.id, isConcluded: false
    }).then(res => {
      handleClick();
      setMessage(res.data.message);
    }).catch(error => {
      console.log(error);
      setMessage(error);
    });
  }
  
  const handleClick = () => {
    setOpenSnackBar(true);
    setTitle('')
    setPriority('')
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackBar(false);
  };

  return (
    <div>
      <Appbar path="/task" title="Cadastrar tarefa" />
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

      <Container maxWidth="md"> <br/>
        <Paper elevation={0} className={classes.paper} variant="outlined">
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField id="outlined-basic" value={title} onChange={event => setTitle(event.target.value)} label="Titulo da tarefa" variant="outlined" className={classes.textfildTitle} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="outlined-basic" value={priority} onChange={event => setPriority(event.target.value)} label="Prioridade" variant="outlined" className={classes.textfildPriority} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button onClick={create} variant="contained" color="primary" disableElevation>Cadastrar</Button>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    </div>
  );
}