const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Хүсэлт илгээх эрх алга");
    
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } 
    catch(err) {
        res.status(401).send(err.message)
    }
} 

