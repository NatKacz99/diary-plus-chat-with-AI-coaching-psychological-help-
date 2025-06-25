import bcrypt from 'bcrypt';
import db from "./../config/DataBase.js";

const saltRounds = 10;

export async function signup(req, res) {
  const { username, password, confirmPassword } = req.body;
  console.log(username);
  console.log(password);
  console.log(confirmPassword);
  try {
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords are not the same.' });
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