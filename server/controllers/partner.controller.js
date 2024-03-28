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

/* Controller function - UPDATE a partner by partnerId */
exports.updatePartner = async (req, res) => {
    const partnerId = req.params.partnerId;
    const updates = req.body;
    try {
        const updatedPartner = await Partner.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
