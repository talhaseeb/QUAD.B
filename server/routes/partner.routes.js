const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partner.controller');

// Route for getting all partners
router.get('/', partnerController.getPartners);

// Route for getting a specific partner by ID
router.get('/:id', partnerController.getPartnerById);

// Route for updating a partner by partnerId
router.put('/:partnerId', partnerController.updatePartner);

module.exports = router;