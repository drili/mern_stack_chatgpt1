const router = require("express").Router()
let User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// ***
// * Register Route
// ***
router.route("/register").post((req, res) => {
    const { username, password } = req.body

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
                password
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

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username
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
                                }
                            });
                        }
                    )
                });
        })
})

module.exports = router