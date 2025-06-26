import React, {useContext} from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Header.css"

function Header() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();  
    setUser(null);  
    navigate("/signin");      
  };

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
              <button className="nav-link-button"><Link to="/signup"><p>Sign Up</p></Link></button>
            </div>
            <div>
              <button className="nav-link-button"><Link to="/signin"><p>Sign In</p></Link></button>
            </div>
            <div>
            <button onClick={handleLogout} className="nav-link-button">Sign Out</button>
          </div>
          </div>
        </div>
      </nav>
    </header >
  );
}

export default Header;
