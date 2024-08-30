const express = require("express");
const { BookingController } = require("../../controllers");
const router = express.Router();

router.post('/booking',BookingController.create);


module.exports = router;