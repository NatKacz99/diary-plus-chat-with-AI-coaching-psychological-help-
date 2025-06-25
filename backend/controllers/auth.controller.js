import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function signup(req, res) {
  const { username, password, confirmPassword } = req.body;
  console.log(username);
  console.log(password);
  console.log(confirmPassword);
  try {
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords are not the same.' });
    }

    const checkResultUsername = await db.query("SELECT * FROM users WHERE name = $1", [
      username
    ]);

    if (checkResultUsername.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exist. Choose a different nick.' })
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
}