const Partner = require('../models/partner.model');

// Controller function - GET all partners
exports.getPartners = async (req, res) => {
    try {
        const partners = await Partner.find()
            .populate({
                path: "userId",
                model: "User",
                select: "name email"
            });
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function - GET a specific partner by ID
exports.getPartnerById = async (req, res) => {
    const partnerId = req.params.id; // Extract partner ID from query parameters
    try {
        const partner = await Partner.findById(partnerId)
            .populate({
                path: "userId",
                model: "User",
                select: "name email address"
            });
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - UPDATE a partner by partnerId */
exports.updatePartner = async (req, res) => {
    const partnerId = req.params.partnerId;
    const updates = req.body;
    try {
        const updatedPartner = await Partner.findByIdAndUpdate(partnerId, req.body, { new: true });
        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
