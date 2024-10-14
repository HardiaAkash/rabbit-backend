const axios = require("axios");
const nodemailer = require("nodemailer");

const shippingRates = [
  {
    weight: 0.5,
    USA: 2300,
    CANADA: 2400,
    EUROPE: 3000,
    AUSTRALIA_NEW_ZEALAND: 3000,
    UK: 1800,
    GULF_COUNTRIES: 1200,
  },
  {
    weight: 1,
    USA: 2800,
    CANADA: 3000,
    EUROPE: 3200,
    AUSTRALIA_NEW_ZEALAND: 3500,
    UK: 2100,
    GULF_COUNTRIES: 1500,
  },
  {
    weight: 1.5,
    USA: 3000,
    CANADA: 3100,
    EUROPE: 3400,
    AUSTRALIA_NEW_ZEALAND: 4000,
    UK: 2300,
    GULF_COUNTRIES: 1700,
  },
  {
    weight: 2,
    USA: 3200,
    CANADA: 3200,
    EUROPE: 3600,
    AUSTRALIA_NEW_ZEALAND: 4300,
    UK: 2400,
    GULF_COUNTRIES: 1800,
  },
  {
    weight: 2.5,
    USA: 3800,
    CANADA: 3800,
    EUROPE: 3900,
    AUSTRALIA_NEW_ZEALAND: 4900,
    UK: 2500,
    GULF_COUNTRIES: 2000,
  },
  {
    weight: 3,
    USA: 4300,
    CANADA: 4400,
    EUROPE: 4200,
    AUSTRALIA_NEW_ZEALAND: 5400,
    UK: 2600,
    GULF_COUNTRIES: 2200,
  },
  {
    weight: 3.5,
    USA: 4500,
    CANADA: 4600,
    EUROPE: 4500,
    AUSTRALIA_NEW_ZEALAND: 5800,
    UK: 2800,
    GULF_COUNTRIES: 2300,
  },
  {
    weight: 4,
    USA: 4600,
    CANADA: 4800,
    EUROPE: 4800,
    AUSTRALIA_NEW_ZEALAND: 6000,
    UK: 3000,
    GULF_COUNTRIES: 2400,
  },
  {
    weight: 4.5,
    USA: 5000,
    CANADA: 5100,
    EUROPE: 5200,
    AUSTRALIA_NEW_ZEALAND: 6500,
    UK: 4000,
    GULF_COUNTRIES: 2500,
  },
  {
    weight: 5,
    USA: 5400,
    CANADA: 5500,
    EUROPE: 5600,
    AUSTRALIA_NEW_ZEALAND: 6800,
    UK: 4500,
    GULF_COUNTRIES: 2600,
  },
  {
    weight: 5.5,
    USA: 4800,
    CANADA: 4800,
    EUROPE: 5100,
    AUSTRALIA_NEW_ZEALAND: 5700,
    UK: 4500,
    GULF_COUNTRIES: 2700,
  },
  {
    weight: 6,
    USA: 4800,
    CANADA: 4800,
    EUROPE: 5100,
    AUSTRALIA_NEW_ZEALAND: 5700,
    UK: 4500,
    GULF_COUNTRIES: 2700,
  },
  {
    weight: 6.5,
    USA: 5600,
    CANADA: 5600,
    EUROPE: 5950,
    AUSTRALIA_NEW_ZEALAND: 6650,
    UK: 5250,
    GULF_COUNTRIES: 3150,
  },
  {
    weight: 7,
    USA: 5600,
    CANADA: 5600,
    EUROPE: 5950,
    AUSTRALIA_NEW_ZEALAND: 6650,
    UK: 5250,
    GULF_COUNTRIES: 3150,
  },
  {
    weight: 7.5,
    USA: 6400,
    CANADA: 6400,
    EUROPE: 6800,
    AUSTRALIA_NEW_ZEALAND: 7600,
    UK: 6000,
    GULF_COUNTRIES: 3600,
  },
  {
    weight: 8,
    USA: 6400,
    CANADA: 6400,
    EUROPE: 6800,
    AUSTRALIA_NEW_ZEALAND: 7600,
    UK: 6000,
    GULF_COUNTRIES: 3600,
  },
  {
    weight: 8.5,
    USA: 7200,
    CANADA: 7200,
    EUROPE: 7650,
    AUSTRALIA_NEW_ZEALAND: 8550,
    UK: 6750,
    GULF_COUNTRIES: 4050,
  },
  {
    weight: 9,
    USA: 7200,
    CANADA: 7200,
    EUROPE: 7650,
    AUSTRALIA_NEW_ZEALAND: 8550,
    UK: 6750,
    GULF_COUNTRIES: 4050,
  },
  {
    weight: 9.5,
    USA: 8000,
    CANADA: 8000,
    EUROPE: 8500,
    AUSTRALIA_NEW_ZEALAND: 9500,
    UK: 7500,
    GULF_COUNTRIES: 4500,
  },
  {
    weight: 10,
    USA: 8000,
    CANADA: 8000,
    EUROPE: 8500,
    AUSTRALIA_NEW_ZEALAND: 9500,
    UK: 7500,
    GULF_COUNTRIES: 4500,
  },
  {
    weight: 10.5,
    USA: 8250,
    CANADA: 8250,
    EUROPE: 9130,
    AUSTRALIA_NEW_ZEALAND: 9900,
    UK: 7920,
    GULF_COUNTRIES: 4620,
  },
  {
    weight: 11,
    USA: 8250,
    CANADA: 8250,
    EUROPE: 9130,
    AUSTRALIA_NEW_ZEALAND: 9900,
    UK: 7920,
    GULF_COUNTRIES: 4620,
  },
  {
    weight: 11.5,
    USA: 9000,
    CANADA: 9000,
    EUROPE: 9960,
    AUSTRALIA_NEW_ZEALAND: 10800,
    UK: 8640,
    GULF_COUNTRIES: 5040,
  },
  {
    weight: 12,
    USA: 9000,
    CANADA: 9000,
    EUROPE: 9960,
    AUSTRALIA_NEW_ZEALAND: 10800,
    UK: 8640,
    GULF_COUNTRIES: 5040,
  },
  {
    weight: 12.5,
    USA: 9750,
    CANADA: 9750,
    EUROPE: 10790,
    AUSTRALIA_NEW_ZEALAND: 11700,
    UK: 9360,
    GULF_COUNTRIES: 5460,
  },
  {
    weight: 13,
    USA: 9750,
    CANADA: 9750,
    EUROPE: 10790,
    AUSTRALIA_NEW_ZEALAND: 11700,
    UK: 9360,
    GULF_COUNTRIES: 5460,
  },
  {
    weight: 13.5,
    USA: 10500,
    CANADA: 10500,
    EUROPE: 11620,
    AUSTRALIA_NEW_ZEALAND: 12600,
    UK: 10080,
    GULF_COUNTRIES: 5880,
  },
  {
    weight: 14,
    USA: 10500,
    CANADA: 10500,
    EUROPE: 11620,
    AUSTRALIA_NEW_ZEALAND: 12600,
    UK: 10080,
    GULF_COUNTRIES: 5880,
  },
  {
    weight: 14.5,
    USA: 11250,
    CANADA: 11250,
    EUROPE: 12450,
    AUSTRALIA_NEW_ZEALAND: 13500,
    UK: 10800,
    GULF_COUNTRIES: 6300,
  },
  {
    weight: 15,
    USA: 11250,
    CANADA: 11250,
    EUROPE: 12450,
    AUSTRALIA_NEW_ZEALAND: 13500,
    UK: 10800,
    GULF_COUNTRIES: 6300,
  },
  {
    weight: 15.5,
    USA: 11840,
    CANADA: 12000,
    EUROPE: 12800,
    AUSTRALIA_NEW_ZEALAND: 14080,
    UK: 11200,
    GULF_COUNTRIES: 6400,
  },
  {
    weight: 16,
    USA: 11840,
    CANADA: 12000,
    EUROPE: 12800,
    AUSTRALIA_NEW_ZEALAND: 14080,
    UK: 11200,
    GULF_COUNTRIES: 6400,
  },
  {
    weight: 16.5,
    USA: 12580,
    CANADA: 12750,
    EUROPE: 13600,
    AUSTRALIA_NEW_ZEALAND: 14960,
    UK: 11900,
    GULF_COUNTRIES: 6800,
  },
  {
    weight: 17,
    USA: 12580,
    CANADA: 12750,
    EUROPE: 13600,
    AUSTRALIA_NEW_ZEALAND: 14960,
    UK: 11900,
    GULF_COUNTRIES: 6800,
  },
  {
    weight: 17.5,
    USA: 13320,
    CANADA: 13500,
    EUROPE: 14400,
    AUSTRALIA_NEW_ZEALAND: 15840,
    UK: 12600,
    GULF_COUNTRIES: 7200,
  },
  {
    weight: 18,
    USA: 13320,
    CANADA: 13500,
    EUROPE: 14400,
    AUSTRALIA_NEW_ZEALAND: 15840,
    UK: 12600,
    GULF_COUNTRIES: 7200,
  },
  {
    weight: 18.5,
    USA: 14060,
    CANADA: 14250,
    EUROPE: 15200,
    AUSTRALIA_NEW_ZEALAND: 16720,
    UK: 13300,
    GULF_COUNTRIES: 7600,
  },
  {
    weight: 19,
    USA: 14060,
    CANADA: 14250,
    EUROPE: 15200,
    AUSTRALIA_NEW_ZEALAND: 16720,
    UK: 13300,
    GULF_COUNTRIES: 7600,
  },
  {
    weight: 19.5,
    USA: 14800,
    CANADA: 15000,
    EUROPE: 16000,
    AUSTRALIA_NEW_ZEALAND: 17600,
    UK: 14000,
    GULF_COUNTRIES: 8000,
  },
  {
    weight: 20,
    USA: 14800,
    CANADA: 15000,
    EUROPE: 16000,
    AUSTRALIA_NEW_ZEALAND: 17600,
    UK: 14000,
    GULF_COUNTRIES: 8000,
  },
  {
    weight: 21,
    USA: 15330,
    CANADA: 15540,
    EUROPE: 16275,
    AUSTRALIA_NEW_ZEALAND: 17850,
    UK: 14280,
    GULF_COUNTRIES: 8400,
  },
  {
    weight: 22,
    USA: 16060,
    CANADA: 16280,
    EUROPE: 17050,
    AUSTRALIA_NEW_ZEALAND: 18700,
    UK: 14960,
    GULF_COUNTRIES: 8800,
  },
  {
    weight: 23,
    USA: 16790,
    CANADA: 17020,
    EUROPE: 17825,
    AUSTRALIA_NEW_ZEALAND: 19550,
    UK: 15640,
    GULF_COUNTRIES: 9200,
  },
  {
    weight: 24,
    USA: 17520,
    CANADA: 17760,
    EUROPE: 18600,
    AUSTRALIA_NEW_ZEALAND: 20400,
    UK: 16320,
    GULF_COUNTRIES: 9600,
  },
  {
    weight: 25,
    USA: 18250,
    CANADA: 18500,
    EUROPE: 19375,
    AUSTRALIA_NEW_ZEALAND: 21250,
    UK: 17000,
    GULF_COUNTRIES: 10000,
  },
  {
    weight: 26,
    USA: 18980,
    CANADA: 19240,
    EUROPE: 20150,
    AUSTRALIA_NEW_ZEALAND: 22100,
    UK: 17680,
    GULF_COUNTRIES: 10400,
  },
  {
    weight: 27,
    USA: 19710,
    CANADA: 19980,
    EUROPE: 20925,
    AUSTRALIA_NEW_ZEALAND: 22950,
    UK: 18360,
    GULF_COUNTRIES: 10800,
  },
  {
    weight: 28,
    USA: 20440,
    CANADA: 20720,
    EUROPE: 21700,
    AUSTRALIA_NEW_ZEALAND: 23800,
    UK: 19040,
    GULF_COUNTRIES: 11200,
  },
  {
    weight: 29,
    USA: 21170,
    CANADA: 21460,
    EUROPE: 22475,
    AUSTRALIA_NEW_ZEALAND: 24650,
    UK: 19720,
    GULF_COUNTRIES: 11600,
  },
  {
    weight: 30,
    USA: 21900,
    CANADA: 22200,
    EUROPE: 23250,
    AUSTRALIA_NEW_ZEALAND: 25500,
    UK: 20400,
    GULF_COUNTRIES: 12000,
  },
  {
    weight: "30-50",
    USA: 720,
    CANADA: 720,
    EUROPE: 700,
    AUSTRALIA_NEW_ZEALAND: 840,
    UK: 660,
    GULF_COUNTRIES: 400,
  },
];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "enquiry@rabbitspeed.in",
    pass: "Rabbitspeed123!",
  },
});

function findClosestWeight(weight) {
  return shippingRates.reduce((prev, curr) =>
    Math.abs(curr.weight - weight) < Math.abs(prev.weight - weight)
      ? curr
      : prev
  );
}

const convertCurrency = async (req, res) => {
  try {
    const { baseCurrency, convertCurrency, amount } = req.body;

    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_VtwKKyZoP9UEk55HfPfmE51xSMtJdf0BeVHzIQwb&currencies=${convertCurrency}&base_currency=${baseCurrency}`
    );

    const data = response.data;
    console.log(data.data[convertCurrency] * amount);

    return res.json({
      totalAmount: (data.data[convertCurrency] * amount).toFixed(2),
      baseAmount: data.data[convertCurrency].toFixed(2),
    });
  } catch (err) {
    return res.status(500).send({ error: "Failed to Convert Currency" });
  }
};
const ShippingCalculate = async (req, res) => {
  const { weight, country } = req.body;

  if (!weight || !country) {
    return res.status(400).json({ error: "Weight and country are required." });
  }

  // Find the rate based on the closest weight
  const rate = findClosestWeight(weight);

  const countryUpper = country.toUpperCase().replace(" ", "_");
  const costPerKg = rate[countryUpper];

  if (costPerKg === undefined) {
    return res
      .status(400)
      .json({ error: `No rates found for country: ${country}` });
  }

  let cost;

  if (weight > 30) {
    // If weight is greater than 30 kg, apply the rate from the "30-50" range
    const baseRate = shippingRates.find((r) => r.weight === "30-50");
    const perKgRate = baseRate[countryUpper];
    const additionalWeight = weight - 30;
    cost = 21900 + additionalWeight * perKgRate;
  } else if (typeof rate.weight === "string") {
    // Special handling for the 30-50kg range in case weight exactly matches
    const extraWeight = weight - 30;
    cost = 21900 + extraWeight * costPerKg;
  } else {
    cost = costPerKg;
  }

  return res.json({ weight, country, cost });
};

const enquiry = async (req, res) => {
  try {
    const {
      customerName,
      originCountry,
      weight,
      destinationCountry,
      phone,
      email,
    } = req.body;

    const mailOptions = {
      from: "vachhanijeel2001@gmail.com",
      to: "jeel.techeniac@gmail.com",
      subject: "New Shipping Enquiry",
      html: `
        <p>You have a new shipping enquiry with the following details:</p>
        <ul>
          <li><strong>Name:</strong> ${customerName}</li>
          <li><strong>Origin Country:</strong> ${originCountry}</li>
          <li><strong>Weight:</strong> ${weight} KG</li>
          <li><strong>Destination Country:</strong> ${destinationCountry}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).send({ message: "Enquiry sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res
      .status(500)
      .send({ message: "Error sending enquiry. Please try again later." });
  }
};
module.exports = {
  convertCurrency,
  ShippingCalculate,
  enquiry,
};
