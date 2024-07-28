var db = require('../connect')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
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
        const token = jwt.sign({ id: data[0].id }, "secrecKey");
        const {password,...others} = data[0];//lay thong tin tru mat khau 
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);
     });
    
}

exports.logout =(req, res) => {
    res.clearCookie("access_token", {
        secure: true,
        sameSite:"none"
    }).status(200).json("Logged out");
}