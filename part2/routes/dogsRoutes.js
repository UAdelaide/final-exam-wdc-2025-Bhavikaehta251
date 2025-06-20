const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all walk requests (for walkers to view)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * from Dogs
      `);
    res.json(rows);
  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch dogs requests' });
  }
});

router.get('/api/user-dogs', async (req, res) => {
    const { owner } = req.query;
    try {
      const [rows] = await db.query(`
        SELECT dog_id, name FROM Dogs
        JOIN Users ON Dogs.owner_id = Users.user_id
        WHERE Users.username = ?
      `, [owner]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load dogs' });
    }
  });


module.exports = router;