const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/open', async (requestAnimationFrame, res) => {
    try{
        const[rows] = await db.query(`
            SELECT
  u.username AS walker_username,
  COUNT(r.rating_id) AS total_ratings,
  ROUND(AVG(r.rating), 1) AS average_rating,
  COUNT(CASE WHEN wa.status = 'accepted' THEN 1 END) AS completed_walks
FROM Users u
LEFT JOIN WalkRatings r ON u.user_id = r.walker_id
LEFT JOIN WalkApplications wa ON u.user_id = wa.walker_id
WHERE u.role = 'walker'
GROUP BY u.user_id, u.username;

        `);
    res.json(rows);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }


});
module.exports = router;