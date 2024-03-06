const express = require('express');
const spController = require('../controllers/sp.controller.js');


const router = express.Router();

router.post("/",  spController.createService);
router.put("/:id",  spController.editService);
router.delete("/:id",  spController.deleteService);
router.get("/single/:id", spController.getService);
router.get("/all", spController.getServices);
router.get("/service-suggestions", spController.getServiceSuggestions);

module.exports = router;
