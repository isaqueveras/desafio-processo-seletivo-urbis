import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router";
import Appbar from "../../components/Appbar";

const useStyles = makeStyles((theme) => ({
}));

export default function EditTask() {
  const { id } = useParams();
  const classes = useStyles();

  return (
    <div>
      <Appbar path="/task" title="Editar tarefa" />
      {id}
    </div>
  );
}