import React, {useState, useEffect} from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import AddIcon from "@mui/icons-material/Add";

function EditNote({ note, onSubmit}) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content); 
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
  }, [note]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...note, title, content });
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <form className="create-note">
      {isExpanded && (
        <input
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      )}

      <textarea
        name="content"
        onClick={expand}
        value={content}
        rows={isExpanded ? 3 : 1}
        onChange={e => setContent(e.target.value)}
      />
      <Zoom in={isExpanded}>
        <Fab onClick={handleSubmit}>
          <AddIcon />
        </Fab>
      </Zoom>
    </form>
  )
}

export default EditNote