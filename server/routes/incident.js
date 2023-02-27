const express = require('express');
const IncidentController = require('../controllers/IncidentController');
const validator = require('../validator/validator');

const router = express.Router();

router.post('/create', IncidentController.createIncident);
router.get('/', IncidentController.getAllIncidents);
router.get('/:incident_id', IncidentController.getIncidentById);
router.delete('/:incident_id', IncidentController.deleteIncidentById);
router.put('/update', IncidentController.updateIncident);

module.exports = router;
