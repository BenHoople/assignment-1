const { create, new: _new } = require('../controllers/UsersController');

module.exports = router => {
  // Step 1: Setup the necessary routes for new and create
  router.get('/Users/new', _new);
  router.post('/Users', create);
};