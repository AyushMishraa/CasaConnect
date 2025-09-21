const { error } = require('console');
const Property = require('../models/property');

async function getAllProperties(req, res) {
    try { 
        const { city, type, minPrice, maxPrice, bedrooms, bathrooms } = req.query;
        let filter = {};

        if (city) filter.city =  { $regex: city, $options: "i" }; // case-insensitive;
        if (type) filter.type = type;
        if (bedrooms) filter.bedrooms = bedrooms;
        if (bathrooms) filter.bathrooms = bathrooms
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
  
        const properties = await Property.find().populate("owner", "name email");
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({message: "Error fetching properties", error: error.message});
    }
}

async function getPropertyById(req, res) {
    try {
        const property = await Property.findById(req.params.id).populate("owner","name email");
        if (!property) {
            res.status(404).json({message: "Property not found", error: error.message});
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({message: "Error fetching properties", error: error.message});
    }
}

async function createProperty(req, res) {
    try {
        const property = new Property({
            ...req.body,
            owner: req.user.id
        })
        await property.save();
        res.status(201).json({message: "Property created successfully",
            _id: property._id
        });
    } catch (error) {
        res.status(500).json({message:"Error saving property", error: error.message});
    }
}

async function updateProperty(req, res) {
    try {
        const property = await Property.findOneAndUpdate(
            {_id: req.params.id, owner: req.user.id},
            req.body,
            { new: true}
        );
        console.log("req.params.id, req.user._id", req.params.id, req.user._id);
        console.log("property", property);
        
        if(!property) {
            return res.status(404).json({message: "Property not found", error: error.message});
        }
        return res.json(property);
    } catch (error) {
        return res.status(500).json({message: "Error updating property", error: error.message});
    }
}

async function deleteProperty(req, res) {
  try {
    const property = await Property.findOneAndDelete(
        {_id: req.params.id, owner: req.user.id}
    );
    if (!property) {
        res.status(404).json({message: "property not found", error: error.message});
    }
    res.json("Property deleted successfully");
  } catch (error) {
    res.status(500).json({message: "Error updating property", error: error.message});
  }
}

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
}