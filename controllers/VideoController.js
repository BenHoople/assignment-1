
const viewPath = ('videos');
const Video = require('../models/Videos');
const User = require('../models/User');
const fileUpload = require('express-fileupload');

// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

- video room

  - index
    show all videos
  - show
    show a video
  - create
    upload video and add to database
  - edit
    edit a video entry
  - update
    apply changes made in edit
  - delete
    delete a video entry

*/
exports.index = async (req, res) => {
    try{
        const videos = await Video.find().populate('user').sort({updatedAt: 'desc'});
        res.render(`${viewPath}/index`, {
            pageTitle: 'Library',
            videos: videos
        });
    }catch(err){
        req.flash('danger', 'We were unable to display the archive for some reason.');
        console.error(err);
        res.redirect('/');
    }
}
exports.show = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        .populate('user');
        res.render(`${viewPath}/show`, {
        pageTitle: video.title,
        video: video
    });
    }catch(err){
        req.flash('danger', 'We were unable to display the video for some reason.');
        console.error(err);
        res.redirect('/');
    }
}
//skipped this by just having a form pop up on index
/*
exports.new = (req,res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'Upload a Video'
    });
}
*/

exports.create = async (req, res) => {
    try {
    if(req.files){
      //create video database entry
      //User association
      const { user: email } = await req.session.passport;
      const user = await User.findOne({email: email});//find user
      //create video
      const video = await Video.create({user: user._id, title: req.body.title, description: req.body.description});
      req.flash('success', 'Video successfully uploaded!');
      

      //move video to folder
      const uploadedVideo = req.files.fileUpload;
      if(uploadedVideo.mimetype === "video/mp4"){
        uploadedVideo.mv(`assets/uploads/videos/${video._id}.mp4`, function(error) {
          if (error)
            return res.status(500).send(error);
      
            res.redirect('/videos');
        });
      }
      
    }
  } catch (err) {
      req.flash('danger', `we ran into an issue, heres what it was: ${err}`)
      req.session.formData = req.body;
      res.redirect('/videos');
  }
}
exports.edit = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
        pageTitle: video.title,
        formData: video
    });
    }catch(err){
        req.flash('danger', 'We were unable to edit this video for some reason, sorry!.');
        console.error(err);
        res.redirect('/');
    }
}
exports.update = async (req, res) => {
    try{
        let video = await Video.findById(req.body.id);
        if(!video) throw new Error("Video couldn't be found");
        
        video = await Video.findByIdAndUpdate(req.body.id,req.body.title, req.body.description);
      

        // const attributes = {user: user._id, ...req.body};
        // await Video.validate(req.body);
        // await Video.findByIdAndUpdate(req.body.id, req.body);
        
        res.flash('success', 'The video was updated!');
        res.redirect(`/videos/${req.body.id}`);
    }catch(error){
        req.flash('danger', 'We were unable to edit this video for some reason, sorry!.');
        console.error(error);
        res.redirect(`/videos/${req.body.id}/edit`);
    }
}

//set up file remover
const fs = require('fs');

exports.delete = async (req, res) => {
    try{

        await Video.deleteOne({_id: req.body.id});

        fs.unlink(`assets/uploads/videos/${req.body.id}.mp4`, (err) => {
          if (err) throw err;
          console.log('video was deleted was deleted');
        });

        req.flash('success', `Your video ${req.body.title} was deleted`);
        res.redirect(`/videos`);
    }catch(error){
        req.flash('danger', 'We were unable to delete this video for some reason, sorry!.');
        console.error(error);
        res.redirect(`/videos/${req.body.id}/edit`);
    }
}