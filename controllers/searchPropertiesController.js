const Property = require("../models/property");

async function searchProperties (req, res) {
  try {
    const query = req.query;
    let filter= {};
    const {
        title,
        type,
        city,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        available
    } = query;
    
    if (title) {
       filter.title = { $regex: title, $options: "i" }; // case-insensitive;
    }
    if (available !== undefined) {
        filter.available = available === "true";
    }
    if (bedrooms) {
        filter.bedrooms = parseInt(bedrooms);
    }
    if (bathrooms) {
        filter.bathrooms = parseInt(bathrooms);
    }
    if (type) {
        filter.type = type;
    }
    if (minPrice || maxPrice) {
       filter.price = {};
       if (minPrice) {
        filter.price = { $gte: parseInt(minPrice) };
       }
       if (maxPrice) {
        filter.price = { $lte: parseInt(maxPrice) };
       }
    }
    if (city) {
        filter.city = { $regex: city, $options: "i" }
    }

    const searchedProperty = await Property.find(filter);
    
    if (!searchedProperty || searchedProperty.length === 0) {
        return res.status(404).json({message: "Searched property not found"});
    }
    
    return res.status(200).json(searchedProperty);
  } catch(error) {
    return res.status(500).json({message:"Error fetching searched properties", error: error.message});
  }
}

module.exports = { searchProperties };