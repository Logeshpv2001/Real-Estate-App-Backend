// routes/propertyRoutes.js
const express = require('express');
const {
    createProperty,
    getProperties,
    updateProperty,
    deleteProperty,
    searchProperties,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, createProperty)
    .get(protect, getProperties);

router.route('/:id')
    .put(protect, updateProperty)
    .delete(protect, deleteProperty);

router.get('/search', searchProperties);

module.exports = router;