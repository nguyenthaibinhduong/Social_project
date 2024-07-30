var db = require('../connect')
var jwt = require('jsonwebtoken');
require('dotenv').config();
exports.getUser = (req, res) => {
    const user_id = req.params.id;
    const q = `SELECT * FROM users WHERE id = ?`;

    db.query(q, [user_id], (err, data) => { 
        if (err) return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.status(200).json(info);
     });
}
exports.updateUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) { 
        return res.status(401).json('Not Logged in');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.status(403).json('Invalid Token');
        const q = "UPDATE users SET name = ?, cover_image = ?,profile_image = ?,city = ?,website = ? WHERE id = ?";
        const values = [
            req.body.name,
            req.body.cover_image,
            req.body.profile_image,
            req.body.city,
            req.body.website,
            data.id,
        ];
        db.query(q,values, (err, data) => { 
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been updated !");
        });
    })
    
}
