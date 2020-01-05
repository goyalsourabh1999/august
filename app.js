const express = require("express");
const app = express();
const users = require("./data/users");
const planRouter = require("./routers/planRouter");
// const userRouter = require("./routers/userRouter");
// converts buffer to json

app.use(express.json());

app.use("/api/plans", planRouter);
// app.use("/api/users", userRouter);

const createUser = function(req, res) {
  const plan = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.json({
    users
  });
};
const getAllUsers = function(req, res) {
  res.json({
    users: users
  });
};

// chaining
// plans

app
  .route("/api/users")
  .get(getAllUsers)
  .post(createUser);

// app.get("/plans",);
// createPlans
// plans/1
// plans/2
// app.patch("/plans/:id", );
// createPlan
// app.post("/plans");

// user
app.get("/users");

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
