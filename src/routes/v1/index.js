const express = require("express");
// const { createChannel } = require("../../utils/messageQueue");
const {BookingController} = require("../../controllers/index");
const router = express.Router();

// const channel = await createChannel();
const bookingController =  new BookingController();

router.post('/booking',bookingController.create);
router.post('/publish',bookingController.sendMessageQueue);

module.exports = router;  