require('dotenv').config();
const jwt = require('jsonwebtoken');
SECRET_KEY_TOKEN = process.env.KEY_TOKEN;

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || '';
    try{
        if(!token){
            res.status(401).json('No token provided');
        }
        const decrypt = await jwt.verify(token, SECRET_KEY_TOKEN);
        req.user ={
            id: decrypt.id,
            name: decrypt.name
        };
        next();
    }catch(error){
        return res.status(500).json(error.toString());
    }
}

module.exports = verifyToken;