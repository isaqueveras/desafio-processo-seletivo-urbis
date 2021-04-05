import { Button, Container, FormControlLabel, Grid, makeStyles, Paper, Snackbar, Switch, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
  let { id } = useParams();
  const { user } = useAuth();
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [isConcluded, setIsConcluded] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    api.get('/task/list/' + id).then(res => {
      setTitle(res.data.title);
      setPriority(res.data.priority);
      setIsConcluded(res.data.isConcluded);
    });
  }, [id]);

  function editar() {
    const task = {
      title: title,
      priority: priority,
      id_user: user.id,
      isConcluded: isConcluded
    };

    api.put('/task/' + id, task).then(res => {
      handleClick();
      setMessage(res.data.message);
    }).catch(error => {
      setMessage(error.data.message);
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

  function handleToggleIsConcluded() {
    setIsConcluded((prevState) => !prevState);
  }

  return (
    <div>
      <Appbar path="/task" title="Editar tarefa" />
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
            <Grid item xs={12} sm={4}>
              <FormControlLabel 
                control={
                  <Switch
                    checked={isConcluded}
                    onChange={handleToggleIsConcluded}
                    color="primary"
                  />
                } 
                label="Finalizado?" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button onClick={editar} variant="contained" color="primary" disableElevation>Editar tarefa</Button>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    </div>
  );
}