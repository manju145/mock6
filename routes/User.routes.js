const express = require("express")
const { UserModel } = require("../model/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { email, pass, name } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {

            const user = UserModel({ email, pass, name })
            await user.save()
            res.status(200).send({ "msg": "New user has been registered" })
            console.log(user)
        });

    } catch (err) {
        res.status(400).send({ "err": err.message })
    }


})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, function (err, result) {

                if (result) {
                    const token = jwt.sign({ authorID: user._id, author: user.name }, "masai")
                    res.status(200).send({ "msg": "Login Successfull", "token": token })
                } else {
                    res.status(200).send({ "msg": "Wrong Password !!!" })
                }
            });

        } else
            res.status(200).send({ "msg": "Wrong Credentials!!!" })
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }
})

module.exports = {
    userRouter
}