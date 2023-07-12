const router = require("express").Router()
let User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtMiddleware = require("../jwtMiddleware")

// ***
// * Register Route
// ***
router.route("/register").post((req, res) => {
    const { 
        username, 
        password,
        email,
        is_activated,
        profile_image,
        user_role,
        user_title
    } = req.body

    if (!username || !password) {
        return res.status(400).json({ msg: "::: Please enter all fields" })
    }

    User.findOne({ username })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: "::: User already exists" })
            }

            const newUser = new User({
                username, 
                password,
                email,
                isActivated: is_activated,
                profileImage: profile_image,
                userRole:user_role
            })

            newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id },
                        "my_jwt_secret",
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) {
                                throw err
                            }

                            res.cookie('token', token, { httpOnly: true });

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    is_activated: user.isActivated,
                                    profile_image: user.profileImage,
                                    user_role: user.userRole,
                                    user_title: user.userTitle
                                }
                            })
                        }
                    )
                })
        })
})

// ***
// * Login Route
// ***
router.route("/login").post((req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({ msg: '::: Please enter all fields' });
    }

    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(400).json({ msg: '::: User does not exist' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: '::: Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        'my_jwt_secret',
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    is_activated: user.isActivated,
                                    profile_image: user.profileImage,
                                    user_role: user.userRole,
                                    user_title: user.userTitle
                                }
                            });
                        }
                    )
                });
        })
})

module.exports = router