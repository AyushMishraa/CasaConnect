const Property = require("../models/property");
const { options } = require("../routes/searchPropertiesRoutes");

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
       filter.title = title;
    }
    if (available) {
        filter.available = available;
    }
    if (bedrooms) {
        filter.bedrooms = bedrooms;
    }
    if (bathrooms) {
        filter.bathrooms = bathrooms;
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
    
    if (!searchProperties) {
        res.status(404).json({message: "Searched property not found"});
    }
    
    res.status(200).json(searchedProperty);
  } catch(error) {
    res.status(500).json({message:"Error fetching searched properties", error: error.message});
  }
}

module.exports = { searchProperties };