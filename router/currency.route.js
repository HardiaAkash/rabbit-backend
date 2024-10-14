const express = require("express");
const currencyConvertController = require("../controller/index");

const router = express.Router();

router.post("/", currencyConvertController.convertCurrency);

module.exports = router;