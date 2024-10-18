const express = require("express");
const currencyConvertController = require("../controller/index");

const router = express.Router();

router.post("/", currencyConvertController.enquiry);
router.post("/contact", currencyConvertController.contactUs)
module.exports = router;
