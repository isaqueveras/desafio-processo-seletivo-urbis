import React, { useEffect, useState } from "react";
import { 
  Avatar,
  Card,
  CardContent,
  Container, 
  Grid, 
  makeStyles, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
} from "@material-ui/core";
import api from "../../services/api";
import Appbar from "../../components/Appbar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#f8f8f8',
    padding: '0px',
    margin: '0px'
  },
  tableHead: {
    backgroundColor: '#ddd',
  },
  card: {
    marginBottom: 15, 
    border: 'none', 
    border: '2px solid #f1f1f4',
    marginTop: '35px'
  },
  grid: {
    backgroundColor: '#f9f9f9'
  },
  gridRight: {
    borderLeft: '2px solid #f1f1f4'
  },
  titleTask: {
    borderBottom: '2px solid #f1f1f4', 
    padding: 12
  }
}));

export default function ListUsers() {
  const [data, setData] = useState([]);
  const classes = useStyles();

  function listUsers() {
    api.get('/user/').then(res => { setData(res.data) });
  }

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <div className={classes.root}>
      <Appbar path="/" title="Lista de usuários" />

      <Container maxWidth="md">
        {data.map((row) => (
          <Card variant="outlined" className={classes.card} key={row.id}>
            <Grid container>
              <Grid item md={4} xs={4} sm={4} className={classes.grid}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <Avatar alt="image of profile" src="https://www.seekpng.com/png/detail/72-729869_circled-user-female-skin-type-4-icon-profile.png" />
                    {row.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {row.email}
                  </Typography>
                </CardContent>
              </Grid>

              <Grid item md={8} xs={8} sm={8} className={classes.gridRight}>
                <Typography variant="h5" component="h2"className={classes.titleTask}>
                  Tarefas
                </Typography>
                <TableContainer>
                  <Table aria-label="table of tasks">
                    <TableHead>
                      <TableRow>
                        <TableCell>Titulo</TableCell>
                        <TableCell>Prioridade</TableCell>
                        <TableCell>Foi concluído?</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell component="th" scope="row">{task.title}</TableCell>
                          <TableCell>{task.priority}</TableCell>
                          <TableCell>{task.isConcluded === true ? 'Sim' : 'Não'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Container>
    </div>
  );
}
