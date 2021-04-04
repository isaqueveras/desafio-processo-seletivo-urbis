import { 
  AppBar, 
  Container, 
  IconButton, 
  makeStyles, 
  Toolbar, 
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
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
}));

export default function Appbar({ path, title }) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appbar}>
      <Container maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="primary" aria-label="menu">
            <Link to={path} className={classes.link}>
              <ArrowBack />
            </Link>
          </IconButton>
          <Typography variant="h6">
            Urbis / {title}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
