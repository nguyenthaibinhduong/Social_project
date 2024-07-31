var db = require('../connect')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const moment = require('moment/moment');
require('dotenv').config();
exports.register = (req, res) => {
    // KIEM TRA USER DA TON TAI
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exist");
        // TAO USER MOI
        //ma hoa mat khau
        const salt = bcrypt.genSaltSync()
        const hashedPassword = bcrypt.hashSync(req.body.password);
        const q = "INSERT INTO users (username,email,password,name) VALUE (?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name,
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("User has been created")
            else return res.status(500).json("Creating user fail");
        });
    });
    
    
}

exports.login = (req, res) => {
    
    var q = "SELECT * FROM users WHERE username = ?";
     db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        //Kiem tra username => nguoi dung ton tai
        if (data.length === 0) return res.status(404).json("User not found");
         //kiem tra mat khau
        var checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) return res.status(400).json("Wrong password or username!");
        // JWT login
        // Tạo access token và refresh token
        const access_token = jwt.sign({ id: data[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
        const refresh_token = jwt.sign({ id: data[0].id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
        
        const query = "INSERT INTO refresh_tokens (token,created_at) VALUES (?,?)";
        db.query(query, [refresh_token,moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, results) => {
            if (err) return res.status(500).json(err);

            const { password, ...others } = data[0]; // Lấy thông tin trừ mật khẩu 
            res.cookie("access_token", access_token, {
                httpOnly: true,
            }).status(200).json({ ...others, refresh_token });
        });
     });
    
}

exports.refreshToken = (req, res) => {
    const refresh_token = req.body.refresh_token;
    if (!refresh_token) return res.sendStatus(401);

    const query = "SELECT * FROM refresh_tokens WHERE token = ?";
    db.query(query, [refresh_token], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(403).json('refresh-token does not exist');

        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) return res.status(400).json("refresh-token invalid");
            const access_token = jwt.sign({ id: data.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
            res.cookie("access_token", access_token, {
                httpOnly: true,
            }).status(200).json({ access_token });
        });
    });
};

exports.logout = (req, res) => {
    const refresh_token = req.body.refresh_token;
    if (!refresh_token) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    const query = "DELETE FROM refresh_tokens WHERE token = ?";
    db.query(query, [refresh_token], (err, results) => {
        if (err) return res.status(500).json(err);
        res.clearCookie('access_token');
        return res.status(200).json('Logged out successfully');
    });
};