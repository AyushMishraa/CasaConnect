const User =  require('../models/user');

async function getUserDetails (req, res) {
  try {
      const user = await User.findById(req.user.id).select("-password");
      console.log("users", user);
        if (!user) {
            res.status(404).json({message: "User not found", error: error.message});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error fetching user", error: error.message});
    }
}

async function updateUserDetails (req, res) {
    try {
        const updates = req.body; 
        const user = req.user;
        const updatedUser = await User.findByIdAndUpdate(
            user.id,
            updates,
            { new: true }
        ).select("-password");
        if (!updatedUser) {
            res.status(404).json({message: "user not found"});
        }
        res.status(200).json({message: "user updated successfully"});
    } catch (error) {
       res.status(500).json({message: "Error fetching user", error: error.message});  
    }
}

module.exports = {
    getUserDetails,
    updateUserDetails
}