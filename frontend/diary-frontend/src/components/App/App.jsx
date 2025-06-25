import React, { useState } from "react";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import Note from "./../Note/Note";
import CreateArea from "./../CreateArea/CreateArea";
import SignUp from "./../SignUp/SignUp";
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState([]);
  const location = useLocation();

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

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
      {location.pathname === "/" && (
        <>
          <CreateArea onAdd={addNote} />
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
      )}

      <Footer />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
