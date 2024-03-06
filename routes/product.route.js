const express = require('express');
const productController = require('../controllers/product.contoller.js');


const router = express.Router();

router.post("/",  productController.createProduct);
router.put("/:id",  productController.editProduct);
router.delete("/:id",  productController.deleteProduct);
router.get("/single/:id", productController.getProduct);
router.get("/all", productController.getProducts);
router.get("/product-suggestions",  productController.getProductSuggestions);

module.exports = router;
