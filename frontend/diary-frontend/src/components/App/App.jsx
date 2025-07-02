import React, { useState, useEffect, useContext, useRef } from "react";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import NoteWithChatbot from "./../Chatbot/NoteWithChatbot";
import CreateArea from "./../CreateArea/CreateArea";
import SignUp from "./../SignUp/SignUp";
import SignIn from "./../SignIn/SignIn";
import EditNote from "./../EditNote/EditNote";
import "./../Chatbot/Chatbot.css";
import { Route, Routes } from 'react-router-dom';
import { UserContext } from "../../contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [chatHistories, setChatHistories] = useState({});

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

  const generateBotResponse = async (history) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: history.map(({ role, text }) => ({
          role: role === 'user' ? 'user' : 'model',
          parts: [{ text }]
        }))
      })
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      const apiText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      return apiText
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getChatHistory = (noteId) => chatHistories[noteId] || [];

  const updateChatHistory = (noteId, newHistory) => {
    setChatHistories(prev => ({
      ...prev,
      [noteId]: newHistory
    }));
  };


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
                <div className="notes-container"> 
                  {notes.map((noteItem, index) => (
                    <NoteWithChatbot
                      key={noteItem.id}
                      id={noteItem.id}
                      title={noteItem.title}
                      content={noteItem.content}
                      onDelete={deleteNote}
                      onEdit={editNote}
                      generateBotResponse={generateBotResponse}
                    />
                  ))}
                </div>
              )}
            </>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
