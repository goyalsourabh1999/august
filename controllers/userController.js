const userModel = require("../models/userModel");
const sharp =require("sharp");
module.exports.getUser = async function(req, res) {
  const { id } = req.body;
  const user = await userModel.findById(id);
  res.json({ user });
};
// update
module.exports.updateUser = async function(req, res) {
  const id = req.params.id;
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  const photo=req.file.filename;
  req.body.photo=photo;
  const user = await userModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true
  });
  console.log(user);
  res.redirect("/me");
};
