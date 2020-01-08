const express = require("express");
const planRouter = express.Router();
const {
  deletePlan,
  getAllPlans,
  getPlan,
  updatePlan,
  createPlan,checkInput
} = require("../controllers/planController");
// api/plans => post
planRouter
  .route("")
  .get(getAllPlans)
  .post(checkInput,createPlan);
planRouter
  .route("/:id")
  .patch(updatePlan)
  .delete(deletePlan)
  .get(getPlan);
module.exports = planRouter;
