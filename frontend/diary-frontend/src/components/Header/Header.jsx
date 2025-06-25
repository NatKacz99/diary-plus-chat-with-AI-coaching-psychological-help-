import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { Link } from 'react-router-dom';
import "./Header.css"

function Header() {
  return (
    <header>
      <nav>
        <div className="navbar">
            <div>
              <Link to="/" style={{ textDecoration: "none" }}><h1>
                <HighlightIcon />
                Diary
              </h1></Link>
            </div>
            <div className="login-and-registration">
            <div>
              <Link to="/signup"><p>Sign Up</p></Link>
            </div>
            <div>
              <Link to="/signin"><p>Sign In</p></Link>
            </div>
            <div>
            <Link to="/sign-out"><p>Sign Out</p></Link>
          </div>
          </div>
        </div>
      </nav>
    </header >
  );
}

export default Header;
