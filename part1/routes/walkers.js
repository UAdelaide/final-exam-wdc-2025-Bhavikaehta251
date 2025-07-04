const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/summary', async (req, res) => {
    try{
        const[rows] = await db.query(`SELECT
    u.username AS walker_username,
    COUNT(DISTINCT r.rating_id) AS total_ratings,
    ROUND(AVG(r.rating), 1) AS average_rating,
    COUNT(DISTINCT wr.request_id) AS completed_walks
  FROM Users u
  LEFT JOIN WalkRatings r ON u.user_id = r.walker_id
  LEFT JOIN WalkRequests wr ON wr.request_id = r.request_id
                             AND wr.status = 'completed'
                             AND u.user_id = r.walker_id
  WHERE u.role = 'walker'
  GROUP BY u.user_id`);
    res.json(rows);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;