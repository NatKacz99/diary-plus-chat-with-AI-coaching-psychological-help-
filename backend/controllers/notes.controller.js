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

export async function deleteNote(req, res) {
  const { noteId, userId } = req.body;

  try {
    await db.query('DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *', [noteId, userId]);
    res.status(200).json({ success: true, message: 'The note was deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function updateNote(req, res) {
  const { noteId, title, content, userId } = req.body;

  try {
    if (title) {
      await db.query('UPDATE notes SET title = ($1) WHERE id = ($2)', [title, noteId])
    }
    if (content) {
      await db.query('UPDATE notes SET content = ($1) WHERE id = ($2)', [content, noteId])
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}