const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customerModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");

router.get("/", async (req, res, next) => {
  const customers = await Customer.find({});
  if (customers && customers.length == 0)
    return res.status(404).send("Customers not found");

  res.send(customers);
});

router.get("/:id", validObjectId, async (req, res) => {
  const customer = await Customer.findById({ _id: req.params.id });
  if (!customer) return res.status(404).send("Customer not found");

  res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) {
    console.log("in the route file");
    return res.status(404).send(error.details[0].message);
  }

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  await customer.save();
  res.send(customer);
});

router.put("/:id", validObjectId, auth, async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
    },
    { new: true }
  );
  if (!customer) {
    return res.status(404).send("Customer not found");
  } else {
    res.send(customer);
  }
});

router.delete("/:id", validObjectId, auth, admin, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    return res.status(404).send("Customer not found");
  } else {
    res.send(customer);
  }
});

module.exports = router;
