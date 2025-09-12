const Property = require("../models/property");

async function pagination (req, res) {
    try {
        const query = req.query;
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const sortBy = parseInt(query.sortBy) || 'title';
        const orderBy = parseInt(query.order) == 'desc' ? -1 : 1; 

        const skip = (page-1)*limit;
        const property = await Property
                               .find()
                               .sort({[sortBy]: orderBy})
                               .skip(skip)
                               .limit(limit);
        res.status(200).json({property});                       
    } catch (error) {
      res.status(500).json({message:"Error fetching searched properties", error: error.message});
    }
}

module.exports = { pagination };