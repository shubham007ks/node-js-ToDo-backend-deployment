import jwt from "jsonwebtoken"


export const sendCookie = (newUser, res, message, statusCode) => {

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET)

    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        })
        .json({
            success: true,
            message,
        })
}