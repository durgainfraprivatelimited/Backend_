const express = require('express');
const router = express.Router();
const { getAllAppointments, deleteAppointment } = require('../controllers/adminAppointmentController');

router.get('/', getAllAppointments);
router.delete('/:appointmentId', deleteAppointment);

module.exports = router; 