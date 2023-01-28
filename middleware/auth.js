const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const {token} = req.cookies

    try {

        if(!token) {
            throw new Error("Token is missing")
        }

        const users = jwt.verify(token, process.env.SECRET)

        req.user = {
            user_id : users.id
        }
    } catch (error) {
        res.status(402).json({
            success: "Issue with middleware",
            message: error.message
        })
    }
    next()
}

module.exports = auth