const express = require("express");
const planRouter = express.Router();
const {
  deletePlan,
  getAllPlans,
  getPlan,
  updatePlan,
  createPlan,
  checkInput,
  queryAdder
} = require("../controllers/planController");
// api/plans => post

planRouter
  .route("")
  .get(getAllPlans)
  .post(checkInput, createPlan);
planRouter.route("/best-5-plans").get(queryAdder, getAllPlans);
planRouter
  .route("/:id")
  .patch(updatePlan)
  .delete(deletePlan)
  .get(getPlan);
module.exports = planRouter;
