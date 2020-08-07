
const viewPath = ('videos');
const Video = require('../models/Video');
const User = require('../models/User');
exports.index = async (req, res) => {
  try {
    const videos = await Video.find().populate('user').sort({updatedAt: 'desc'});
    res.status(200).json(videos);
  } catch (error) {
    res.status(420).json({message: 'There was an error fetching the videos', error});
  }
}
exports.profile = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({email: email});
    const videos = await Video.find({ "user" : user }).populate('user').sort({updatedAt: 'desc'});
    res.status(200).json(videos);
  } catch (error) {
    res.status(420).json({message: 'There was an error fetching the videos', error});
  }
}
exports.show = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('user');
    
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({message: "There was an error fetching the video"});
  }
};
exports.new = (req,res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'Upload a Video'
    });
}

exports.create = async (req, res) => {
    try {
      //get video link and get the ID and check for hackers!
      let videoID = req.body.videoID;
      videoID = videoID.replace("https://www.youtube.com/watch?v=","");
      //i checked several viedo IDs and they all only contain a-z, digits _'s and -'s. so no cross site scripting today!
      if(!videoID.match('/([A-Za-z0-9_-])\w+/')){
        res.status(420).json({message: "You tryna hack me bro?"});
      } 
      //create video database entry
      //find the user
      const { user: email } = await req.session.passport;
      const user = await User.findOne({email: email});
      //determin status
      let status;
      if(req.body.status === undefined){
        status = "PRIVATE";
      }else{
        status = "PUBLIC"
      }
      //now add the video to the database
      const video = await Video.create({user: user._id, title: req.body.title, description: req.body.description, videoID, status});
      res.status(200);
  } catch (err) {
      res.status(400).json({message: `we ran into an issue, heres what it was: ${err}`})
  }
}
exports.edit = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if(video){
        return res.status(200).json({
          status: 'success',
          message: 'Logged in successfully',
          video: video
        })
      }
      //old code
        res.render(`${viewPath}/edit`, {
        pageTitle: video.title,
        formData: video
    });
    }catch(err){
        req.flash('danger', 'We were unable to edit this video for some reason, sorry!.');
        console.error("the error is in edit: "+err);
        res.redirect('/');
    }
}
exports.update = async (req, res) => {
    try{
        //find the video
        let video = await Video.findById(req.body.id);
        if(!video) res.status(400).json({message:"Video couldn't be found"});
        //get video link and get the ID and check for hackers!
        let videoID = req.body.videoID;
        videoID = videoID.replace("https://www.youtube.com/watch?v=","");
        console.log(videoID);
        //i checked several viedo IDs and they all only contain a-z, digits _'s and -'s. so no cross site scripting today!
        if(videoID.match('/([A-Za-z0-9_-])\w+/')){
          res.status(420).json({message: "You tryna hack me bro?"});
        } 
        //find the user
        const { user: email } = await req.session.passport;
        const user = await User.findOne({email: email});
        //determin status
        let status;
        if(req.body.status === undefined){
          status = "PRIVATE";
        }else{
          status = "PUBLIC"
        }
        //use the videoID to find and update the video with the new variables
        video = await Video.findByIdAndUpdate(req.body.id,{user: user._id, title: req.body.title, description: req.body.description, videoID, status});
        res.status(200);
    }catch(error){
        res.status(400).json({message: error});
    }
}

exports.delete = async (req, res) => {
    try{
      await Video.deleteOne({_id: req.body.id});
      res.status(200);
    }catch(error){
      res.status(400).json({message : 'We were unable to delete this video for some reason, sorry!'});
    }
}