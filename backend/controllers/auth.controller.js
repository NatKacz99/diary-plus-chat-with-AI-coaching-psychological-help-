import bcrypt from 'bcrypt';
import passport from "passport";
import db from "./../config/DataBase.js";
import { sanitizeString } from '../middleware/sanitization.js';

const saltRounds = 10;

export const authorizationGoogleScope = passport.authenticate("google", {
  scope: ["profile", "email"]
});

export function authGoogleCallback(req, res) {
  res.redirect("http://localhost:5173/");
}

export async function signup(req, res) {
  var { username, password, confirmPassword } = req.body;
  console.log(username);
  console.log(password);
  console.log(confirmPassword);
  try {
    username = sanitizeString(username, 255);
    password = sanitizeString(password, 255);
    confirmPassword = sanitizeString(confirmPassword, 255);

    if (username.length > 50) {
      return res.status(400).json({ 
        success: false, 
        message: `Username too long (${username.length} characters). Maximum: 50 characters.` 
      });
    }

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords are not the same.' });
    }

    if(password.length < 8){
      return res.status(400).json({ success: false, message: `The password must consist of at least 8 characters`});
    }

    if (password.length > 100) {
      return res.status(400).json({ 
        success: false, 
        message: `Password too long (${password.length} characters). Maximum: 100 characters.` 
      });
    }

    const checkResultUsername = await db.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);

    if (checkResultUsername.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exist. Choose a different nick.' })
    }

    try {
      const hash = await bcrypt.hash(password, saltRounds);
      const result = await db.query(
        `INSERT INTO USERS (username, password) VALUES ($1, $2)`,
        [username, hash]
      );
      return res.status(200).json({ success: true, message: 'Registration was successful!' });
    } catch (err) {
      console.error("Error during registration:", err);
      return res.status(500).json({ success: false, message: 'Registration failed.' });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
}

export async function signin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      console.warn("Authentication failed:", info);
      return res.status(401).json({ success: false, message: info?.message || "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      return res.json({ success: true, user: { id: user.id, username: user.username } });
    });
  })(req, res, next);
}