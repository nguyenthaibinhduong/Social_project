const db = require('../connect');
const jwt = require('jsonwebtoken');
const moment = require('moment/moment');
exports.getLike = (req, res) => { 
    const q = `SELECT user_id from likes where post_id =?`;
    db.query(q, [req.query.post_id], (err, data) => { 
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like=>like.user_id));
    });
}
exports.addLike = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) { 
        return res.status(401).json('Not Logged in');
    }
    jwt.verify(token, "secrecKey", (err, data) => {
        if (err) return res.status(403).json('Invalid Token');
        const q = "INSERT INTO likes(user_id,post_id) VALUES (?)";
        const values = [
            data.id,
            req.query.post_id
        ];
        db.query(q, [values], (err, data) => { 
            if (err) return res.status(500).json(err);
            return res.status(200).json("Likes has been created !");
        });
    })
    
}
exports.deleteLike = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) { 
        return res.status(401).json('Not Logged in');
    }
    jwt.verify(token, "secrecKey", (err, data) => {
        if (err) return res.status(403).json('Invalid Token');
        const q = "DELETE FROM likes where user_id = ? and post_id = ?";
        db.query(q, [data.id,req.query.post_id], (err, data) => { 
            if (err) return res.status(500).json(err);
            return res.status(200).json("Likes has been deleted !");
        });
    })
    
}