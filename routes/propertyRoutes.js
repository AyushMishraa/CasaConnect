const express = require('express')
const { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { verifyToken, isOwner } = require('../middlewares/authMiddleware');
const propertyRoute = express.Router();

propertyRoute.get('/', getAllProperties);
propertyRoute.get('/:id', getPropertyById);
propertyRoute.post('/addProperty', verifyToken, isOwner, createProperty);
propertyRoute.put('/editProperty/:id', verifyToken, isOwner, updateProperty);
propertyRoute.delete('/removeProperty/:id', verifyToken, isOwner, deleteProperty);

module.exports = propertyRoute;
