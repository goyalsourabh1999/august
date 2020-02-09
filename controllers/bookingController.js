const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const bookingModel = require("../models/bookingModel");
const END_POINT_SECRET = process.env.END_POINT_SECRET;
// const stripe = require("stripe");
const SK = process.env.SK;
const stripe = require('stripe')(SK);
module.exports.createCheckoutSession = async function (req, res) {
  const id = req.params.id;
  const user = req.user;
  const userId = user["_id"];
  const plan = await planModel.findById(id);
  console.log(plan);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: user.email,
    line_items: [{
      name: plan.name,
      description: plan.description,
      amount: plan.price * 100,
      currency: 'inr',
      quantity: 1,
    }],
    success_url: `${req.protocol}://${req.get("host")}/me`,
    cancel_url: `${req.protocol}://${req.get("host")}/login`,
  });
  res.json({
    session,
    userId
  })









  // id=> planModel.findbyId
  // session=> npm install stripe 








}

module.exports.createNewBooking = async function (userEmail, planName) {

  const user = await userModel.findOne({ email: userEmail });
  const plan = await planModel.findOne({ name: planName });
  const planId = req.body.planId;
  const userId = req.body.userId;

  if (user.userBookedPlansId == undefined) {
    // 1 first time user
    const order = {
      userId: userId,
      bookedPlans: [
        {
          planId: planId,
          name: plan.name,
          currentPrice: plan.price

        }
      ]
    }
    // create a new users booking
    const newOrder = await bookingModel.create(order);
    // user update
    user.userBookedPlansId = newOrder["_id"];
    await user.save({ validateBeforeSave: false });
    
  }
  else {
    const newPlan = {
      planId: planId,
      name: plan.name,
      currentPrice: plan.price
    }
    const booking = await bookingModel.findById(user.userBookedPlansId);
    booking.bookedPlans.push(newPlan);
    const newBookedPlans = booking.bookedPlans;
    const newbooking = await bookingModel.findByIdAndUpdate(booking["_id"], {
      bookedPlans: newBookedPlans
    }, { new: true });
   
  }


  // 2. previous user
  // user => search 


}

module.exports.createBooking = async function (request, response) {
  const sig = request.headers['stripe-signature'];
  let event;
  const endpointSecret = END_POINT_SECRET;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log(event);
    if (event.type == "checkout.session.completed") {
      const userEmail = event.data.object.customer_email;
      const planName = event.data.object.line_items[0].name;
      await createNewBooking(userEmail, planName);
      // payment complete
      response.json({ received: true });
    }
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
}
