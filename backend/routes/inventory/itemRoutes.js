    const express = require('express');
const router = express.Router();
const itemController = require("../../controllers/inventory/itemController");

// create item
router.post("/", itemController.setItem);

// read all items
router.get("/", itemController.getItems);

//read specific item
router.get("/:itemid", itemController.getItemById);

//update item
router.patch("/:itemid",itemController.updateItem);
  
//delete item
router.delete("/:itemid", itemController.deleteItem);

module.exports = router
