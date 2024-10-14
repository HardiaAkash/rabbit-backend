const express = require("express");

const router = express.Router();
const CurrentConvertRoute = require("./currency.route");
const ShippingRoute = require("./shipping.route");
const Enquiry = require("./enquiry.route");

const defaultRoutes = [
  {
    path: "/currency-convert",
    route: CurrentConvertRoute,
  },
  {
    path: "/calculate-shipping",
    route: ShippingRoute,
  },
  {
    path: "/enquiry",
    route: Enquiry,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
