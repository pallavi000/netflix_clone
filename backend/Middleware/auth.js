var jwt = require('jsonwebtoken');

function auth(req,res,next){
const token = req.header('access-token')

try {
    const decode = jwt.verify(token,'netflix')
   req.user= decode
   next()
} catch (error) {
    res.status(400).json(error.message)
}
}

module.exports=auth