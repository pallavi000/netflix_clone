const jwt = require("jsonwebtoken");

function adminAuth(req,res,next){

    const token = req.header('access-token')

    try {
        const decode = jwt.verify(token,'netflix')
       req.user= decode
       if(req.user.role=='admin'){
           next()
       }else{
           res.status(400).json('unauthorize')
       }
    } catch (error) {
        res.status(400).json(error.message)
    }

}

module.exports= adminAuth

