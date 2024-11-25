const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, time } = req.body;

    // Check if appointment slot is available
    const existingAppointment = await Appointment.findOne({
      date,
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    const newAppointment = await Appointment.create({
      name,
      email,
      phone,
      date,
      time,
      userId: req.user?._id // If using authentication
    });

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      data: newAppointment
    });
  } catch (error) {
    console.error('Appointment creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule appointment',
      error: error.message
    });
  }
}; 