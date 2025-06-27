import db from "./../config/DataBase.js";

export async function addNote(req, res) {
  const { title, content, userId } = req.body;
  if (!userId || !title || !content) {
    return res.status(400).json({ success: false, message: 'Missing required data' });
  }

  try {
    const result = await db.query(`INSERT INTO notes (content, user_id, title)
      VALUES ($1, $2, $3) RETURNING *`, [content, userId, title]);
    const note = result.rows[0];
    console.log(note);
    res.status(200).json({ success: true, message: 'The note was added' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export async function displayUserNotes(req, res) {
  const userId = parseInt(req.query.userId, 10);

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const result = await db.query(
      'SELECT id, title, content FROM notes WHERE user_id = $1 ORDER BY id DESC',
      [userId]
    );
    res.status(200).json({ success: true, notes: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}