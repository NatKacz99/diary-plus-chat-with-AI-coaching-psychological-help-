import React, { useState, useEffect, useContext } from "react";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import Note from "./../Note/Note";
import CreateArea from "./../CreateArea/CreateArea";
import SignUp from "./../SignUp/SignUp";
import SignIn from "./../SignIn/SignIn";
import EditNote from "./../EditNote/EditNote";
import ChatbotIcon from "./../Chatbot/ChatbotIcon";
import ChatForm from "./../Chatbot/ChatForm";
import "./../Chatbot/Chatbot.css";
import { Route, Routes } from 'react-router-dom';
import { UserContext } from "../../contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const handleNoteAdded = (newNoteFromServer) => {
    setNotes(prev => [newNoteFromServer, ...prev]);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!user || !user.id) return;

        const response = await fetch(`http://localhost:3000/displayUserNotes?userId=${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });

        const data = await response.json();

        if (data.success) {
          setNotes(data.notes);
        } else {
          console.error("Retriving notes error: ", data.message);
        }

      } catch (err) {
        console.error("Retriving notes error: ", err);
      }
    };

    fetchNotes();
  }, [user]);

  function deleteNote(id) {
    const noteToDelete = notes[id];

    fetch("http://localhost:3000/deleteNote", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId: noteToDelete.id,
        userId: user.id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotes(prevNotes => prevNotes.filter((noteItem, index) => id !== index));
        } else {
          console.error("The note wasn't delete:", data.message);
        }
      })
      .catch(err => {
        console.error("Server error:", err);
      });
  }

  function editNote(id) {
    const noteToEdit = notes[id];
    console.log("Editing note:", noteToEdit);
    setEditingNote(noteToEdit);
  }

  function updateNote(updatedNote) {
    fetch("http://localhost:3000/updateNote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId: updatedNote.id,
        title: updatedNote.title,
        content: updatedNote.content,
        userId: user.id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotes(prevNotes =>
            prevNotes.map(note =>
              note.id === updatedNote.id ? updatedNote : note
            )
          );
          setEditingNote(null);
        } else {
          console.error("Error updating note:", data.message);
        }
      })
      .catch(err => {
        console.error("Error updating note:", err);
      });
  }

  return (
    <div>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <CreateArea onNoteAdded={handleNoteAdded} />

              {editingNote ? (
                <EditNote
                  note={editingNote}
                  onSubmit={updateNote}
                />
              ) : (
                notes.map((noteItem, index) => (
                  <Note
                    key={index}
                    id={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                    onEdit={editNote}
                  />
                ))
              )}
            </>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there 👋 <br />
              How can I help you today?
            </p>
          </div>
          <div className="message user-message">
            <p className="message-text">
              bla bla
            </p>
          </div>
        </div>

        <div className="chat-footer">
          <ChatForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
