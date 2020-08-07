const User = require('../models/User');
const viewPath = 'users';

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New User'
  });
};

exports.create = async (req, res) => {  
  try {
    //create a user variable
    if(req.body.email !== req.body.emailConfirmation || req.body.password !== req.body.passwordConfirmation){
      res.status(420).json({message:"your password and emails must match!"});
    }
    // delete req.body.passwordConfirmation;
    // delete req.body.emailConfirmation;
    console.log(req.body);
    const user = new User(req.body);
    console.log(user);

    //upload it to the database
    await User.register(user, req.body.password);
    //hopefully it worked
    res.status(200);
    } catch (err) {
        res.status(400).json({message: `We failed to create an account`})
    }
};