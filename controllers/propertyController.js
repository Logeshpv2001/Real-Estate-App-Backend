// controllers/propertyController.js
const Property = require('../models/propertyModel');

exports.createProperty = async (req, res) => {
    const { type, location, price, description } = req.body;
    try {
        const property = new Property({
            type,
            location,
            price,
            description,
            agent: req.agent.id,
        });
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find({ agent: req.agent.id });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchProperties = async (req, res) => {
    const { location, priceMin, priceMax, type } = req.query;
    try {
        const properties = await Property.find({
            location: new RegExp(location, 'i'),
            price: { $gte: priceMin, $lte: priceMax },
            type: new RegExp(type, 'i'),
        });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};