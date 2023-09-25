const express = require('express');
const router = express.Router();

/*const { 
    getItems,
    setItem,
    updateItem,
    deleteItem,
    getSpecificItem,
} = require('../../controllers/inventory/itemController')*/

const itemController = require("../../controllers/sales/itemController");


//const {protect} = require('../../middleware/authMiddleware')

//router.route('/').post(setItem)
router.post("/", itemController.setItem);
router.get("/", itemController.getItems);

//read payment request
router.get("/:itemid", itemController.getItemById);
router.patch("/:itemid",itemController.updateItem);
  
router.delete("/:itemid", itemController.deleteItem);


//router.route('/').get(protect, getItems).post(protect, setItem)
//router.route('/:id').put(protect, updateItem).delete(protect, deleteItem).get(protect, getSpecificItem)


module.exports = router
