const express = require("express");
const router = express.Router();
const catchAsync = require("express-async-handler");
const recordController = require("../controllers/recordController");
const { isLoggedIn } = require("../middleware");
const Joi = require("joi");

router.route("/add").post(isLoggedIn, catchAsync(recordController.addRecord));
router
  .route("/delete")
  .delete(isLoggedIn, catchAsync(recordController.deleteRecord));
router
  .route("/summarystats")
  .get(isLoggedIn, catchAsync(recordController.getSummaryStats));
router
  .route("/summarystatscontract")
  .get(isLoggedIn, catchAsync(recordController.getSummaryStatsOnContract));
router
  .route("/summarystatsdepartment")
  .get(isLoggedIn, catchAsync(recordController.getSummaryStatsOnDepartment));

router
  .route("/summarystatssubdepartment")
  .get(isLoggedIn, catchAsync(recordController.getSummaryStatsOnSubDepartment));
module.exports = router;
