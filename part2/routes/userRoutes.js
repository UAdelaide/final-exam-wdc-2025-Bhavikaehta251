const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// router.get('/me', (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ error: 'Not logged in' });
//   }
//   res.json(req.session.user);
// });

function ensureLoggedIn(req, res, next) {
  if (!req.session.user_id) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  next();
}
router.get('/me', ensureLoggedIn, (req, res) => {
  res.json(req.session.user_id);
});


// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE email = ? AND password_hash = ?
    `, [email, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // req.session.user = rows[0];
    res.status(200).json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// router.get('/me', async (req, res) => {
//   try {
//     const username = req.session.loggedInUser || null;
//     res.json(username);

//     if (!username) return res.status(401).json({ error: 'Not logged in' });

//     const [rows] = await db.query(`
//       SELECT user_id, username, role FROM Users
//       WHERE username = ?
//     `, [username]);

//     if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

//     res.json(rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

module.exports = router;