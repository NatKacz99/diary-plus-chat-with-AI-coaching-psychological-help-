import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext"; 
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const { user } = useContext(UserContext);
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function submitNote(event) {
  event.preventDefault();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.id;

  const newNote = {
    title: note.title,
    content: note.content,
    userId: userId
  };

  try {
    const response = await fetch("http://localhost:3000/addNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newNote)
    });

    const data = await response.json();

    if (data.success) {
      setNote({ title: "", content: "" });

      if (props.onNoteAdded) {
        props.onNoteAdded(data.newNote);
      }
    } else {
      console.error("Adding note error: ", data.message);
    }
  } catch (err) {
    console.error("Add note error: ", err);
  }
}

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
