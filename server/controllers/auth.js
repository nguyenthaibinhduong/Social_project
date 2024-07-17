var db = require('../connect')
var bcrypt = require('bcryptjs')
exports.register = (req, res) => {
    // KIEM TRA USER DA TON TAI
    var q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exist")
    });
    
    // TAO USER MOI
        //ma hoa mat khau
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(req.body.password);
    var q = "INSERT INTO users (username,email,password,name) VALUES (?,?,?,?)";
    db.query(q, [req.body.username,req.body.email,hashedPassword,req.body.name], (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User has been created")
    });
}

exports.login = (req, res) => {
    //Kiem tra username => nguoi dung ton tai
    var q = "SELECT * FROM users WHERE username = ?";
     db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.length ===0) return res.status(404).json("User not found")
     });
    //kiem tra mat khau
    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
    if (!checkPassword) return res.status(400).json("Wrong password or username!")
    return res
}

exports.logout =(req, res) => {
    
}