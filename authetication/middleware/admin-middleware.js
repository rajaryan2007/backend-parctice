const isAdminUser = (req,res,next)=>{
    if(req.userInfo.role != 'admin'){
        return res.status(403).json({
            sucess :false,
            Message:'access denied  admin router rights required'
        });
    }
    next();
}

module.exports = isAdminUser;