import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {
  function handleClickDelete() {
    props.onDelete(props.id);
  }

  function handleClickEdit(){
    props.onEdit(props.id)
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClickEdit}>
        <EditIcon />
      </button>
      <button onClick={handleClickDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
