const { index, profile, show, new: _new, create, edit, update, delete: _delete } = require('../controllers/VideoController');



function authorized (req, res, next) {
    if(!req.isAuthenticated()){
        return res.status(401).json({message: "you have to login! before doing that!"})
    }
    next();
}

module.exports = router => {
    router.get('/videos', index);
    router.post('/videos/profile', profile);
    router.get('/videos/new', authorized, _new);
    router.post('/videos', authorized, create);
    router.post('/videos/update', authorized, update);
    router.post('/videos/delete', authorized, _delete);
    router.get('/videos/:id/edit', authorized, edit);
    router.get('/videos/:id', show);
};