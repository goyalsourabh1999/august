const planModel = require("../models/planModel");
// const stripe = require("stripe");
const SK = require("../configs/config").SK;
const stripe = require('stripe')(SK);
module.exports.createCheckoutSession = async function (req,res) {
    const id = req.params.id;
    const plan = await planModel.findById(id);
console.log(plan);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: plan.name,
          description: plan.description,
          amount: plan.price*100,
          currency: 'inr',
          quantity: 1,
        }],
        success_url: "http://localhost:3000/me",
        cancel_url: 'http://localhost:3000/login',
      });
    res.json({
        session
    })











    // id=> planModel.findbyId
    // session=> npm install stripe 








}