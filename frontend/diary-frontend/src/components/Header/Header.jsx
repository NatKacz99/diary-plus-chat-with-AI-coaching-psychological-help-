import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/"><h1>
        <HighlightIcon />
        Diary
      </h1></Link>
      </nav>
    </header>
  );
}

export default Header;
