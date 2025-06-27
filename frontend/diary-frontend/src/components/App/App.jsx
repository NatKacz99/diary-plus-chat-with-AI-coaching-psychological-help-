import React, { useState, useEffect, useContext } from "react";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import Note from "./../Note/Note";
import CreateArea from "./../CreateArea/CreateArea";
import SignUp from "./../SignUp/SignUp";
import SignIn from "./../SignIn/SignIn";
import { Route, Routes } from 'react-router-dom';
import { UserContext } from "../../contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);

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
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
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
              {notes.map((noteItem, index) => (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={deleteNote}
                />
              ))}
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
