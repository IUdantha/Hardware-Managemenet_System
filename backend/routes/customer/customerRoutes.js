const express = require("express");
const { check } = require("express-validator");

const customerController = require("../../controllers/customer/customerController");

const router = express.Router();

//create customer request
router.post(
  "/",
  [
    check("recNub").not().isEmpty(),
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("type").not().isEmpty(),
    check("nic").not().isEmpty(),
    check("date").not().isEmpty(),
    check("contact").not().isEmpty(),
    check("address"),
  ],
  customerController.createCustomer
);

//delete customer request
router.delete("/:cusid", customerController.deleteCustomer);

//read customer request
router.get("/:cusid", customerController.getCustomerById);

//read all customers
router.get("/", customerController.getAllCustomers);

//update customer request
router.patch(
  "/:cusid",
  [
    check("recNub").not().isEmpty(),
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("type").not().isEmpty(),
    check("nic").not().isEmpty(),
    check("date").not().isEmpty(),
    check("contact").not().isEmpty(),
    check("address"),
  ],
  customerController.updateCustomer
);

module.exports = router;




















/*const express = require('express')
const router = express.Router()

//goalController.js -> goalRoutes.js
//Get the functions
const { 
    getCustomers,
    registerCustomer,
    updateCustomer,
    deleteCustomer,
    getProfile
} = require('../../controllers/customer/customerController')

const {protect} = require('../../middleware/authMiddleware')



//(Here the '/' is enough. because the api call is specified in server.js file)

//router.get('/', getGoals)
//router.post('/', setGoal)
router.route('/').get( getCustomers).post( registerCustomer)


//To update and delete you need the id
//router.put('/:id', updateGoal)
//router.delete('/:id', deleteGoal)
router.route('/:id').patch(updateCustomer).delete( deleteCustomer)
router.get('/:id', getProfile)


module.exports = router */