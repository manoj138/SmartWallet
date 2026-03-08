const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", ""); 

    if (!token) {
        return res.status(401).json({ msg: "No token, Access Denied" });
    }

    try {
        const decoded = jwt.verify(token, "mv9mtmgrg7494dd");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(422).json({error,  msg: "Token not valid" });
    }
}
 module.exports = auth;
