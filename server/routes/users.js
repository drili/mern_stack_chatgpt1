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

// ***
// * Update User Route
// ***
router.route("/profile/update").put((req, res) => {
    const { username, email, userTitle, userId } = req.body;

    console.log(req.body)
    User.findByIdAndUpdate(
        userId,
        {
            $set: {
                username,
                email,
                userTitle
            }
        },
        { new: true }
    )
    .then((updatedUser) => {
        res.json({
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                is_activated: updatedUser.isActivated,
                profile_image: updatedUser.profileImage,
                user_role: updatedUser.userRole,
                user_title: updatedUser.userTitle
            }
        })
})
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user information' });
    });
})

// ***
// * Update User Password Route
// ***
router.put("/profile/update-password", async (req, res) => {
    const { newPassword, userId } = req.body;

    try {
        const user = await User.findById(userId)
        if(!user) {
            return res.status(400).json({ msg: "::: User not found" })
        }

        // const isMatch = await bcrypt.compare(newPassword, user.password)
        // if (!isMatch) {
        //     return res.status(400).json({ msg: "::: Current password is incorrect" });
        // }

        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = newPassword
        await user.save()

        res.json({ msg: "Password updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to update password" })
    }
    
})

module.exports = router