import React, { useState, useRef, useEffect } from "react";
import Note from "./../Note/Note";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import "./Chatbot.css"

function NoteWithChatbot({ id, title, content, onDelete, onEdit, generateBotResponse }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleGenerateBotResponse = async (history) => {
    try {
      const botResponse = await generateBotResponse(history);

      setChatHistory(prev =>
        prev.filter(msg => msg.text !== "Thinking...")
          .concat([{ role: "model", text: botResponse }])
      );
    } catch (error) {
      setChatHistory(prev =>
        prev.filter(msg => msg.text !== "Thinking...")
          .concat([{ role: "model", text: "Sorry, something went wrong. Please try again." }])
      );
    }
  };

  return (
    <>
      <div className="note-with-chat-container">
        <Note id={id} title={title} content={content} onDelete={onDelete} onEdit={onEdit} />
        <button onClick={() => setShowChatbot(prev => !prev)} id="chatbotToggler">
          <span className="material-symbols-rounded">
            {showChatbot ? 'close' : 'mode_comment'}
          </span>
        </button>
        {/* Chatbot Popup - show when only showChatbot = true */}
        <div className={`chatbot-popup ${showChatbot ? 'show-chatbot' : ''}`}>
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">Chatbot</h2>
            </div>
            <button className="material-symbols-rounded" onClick={() => setShowChatbot(false)}>keyboard_arrow_down</button>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there 👋 <br />
                How can I help you today?
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={handleGenerateBotResponse}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default NoteWithChatbot;
