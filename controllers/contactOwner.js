const User = require("../models/user");
const Property = require("../models/property");

async function getOwnerDetails (req, res) {
    try {
        const property = await Property.findById(req.params.id).populate("owner","name email phone address");
        if (!property) {
            res.status(404).json({message: "contact details not found of owner"});
        }
        res.status(200).json({owner: property.owner});
    } catch (error) {
        res.status(500).json({message: "Error fetching owner details", error: error.message});
    }
}

module.exports = {
    getOwnerDetails
}