const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{

    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success:false,
            message:'acesss denied no token provide'
        })
    }
    try {
        const decodeTokenInfo = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decodeTokenInfo);

        req.userInfo = decodeTokenInfo;

          next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'acesss denied error'
        })
    }
    
    console.log('auth middleware in called ')
  
}

module.exports = authMiddleware;