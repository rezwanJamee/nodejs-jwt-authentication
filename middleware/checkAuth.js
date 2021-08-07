const JWT = require("jsonwebtoken")

module.exports = async (req, res, next ) => {

    const token = req.header('x-auth-token')

    //Check if the token is present
    if(!token){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "No JWT token found",
                }
            ]
        })
    }

    //validate token
    try{
        let user = await JWT.verify(token, process.env.SECRET);
        req.user = user.email;
        next();
    }catch(error){
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Token invalid",
                }
            ]
        })
    }
}