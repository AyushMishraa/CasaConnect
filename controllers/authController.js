const User = require("../models/user");
const generateToken = require('../utils/jwt')

async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({email});
        
        if (userExists) {
          return res.status(400).json({message: "user already exists"});
        }

        const user = await User.create({name, email, password, role});

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
       res.status(500).json({message: "Error from server", error: error.message});
    }
};

async function loginUser (req, res) {
    // try {
    //     const { email, password } = req.body;
        
    //     const user = await User.findOne({email});
    //     console.log("user", user);
    //     console.log("password", await user.comparePassword(password));
        
    //     if (user && (await user.comparePassword(password))) {
    //         res.status(200).json({
    //             _id: user._id,
    //             name: user.name,
    //             email: user.email,
    //             role: user.role,
    //             token: generateToken(user._id, user.email, user.role)
    //         })
    //     } else {
    //         res.status(401).json({message: "password or email is incorrect"});
    //     }
    // } catch (error) {
    //     res.status(500).json({message: "Error from server", error: error.message})
    // }
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id, user.email, user.role);

        //  Send token in cookie
        res.cookie("token", token, {
        httpOnly: true,   // prevents JS access
        // secure: process.env.NODE_ENV === "production", // true on HTTPS
        secure: true,
        sameSite: "strict",
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
    registerUser,
    loginUser
}