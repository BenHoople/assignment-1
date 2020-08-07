// INSTRUCTIONS
/*
  name/title
  video Url
  thumbnailUrl
  description
  association with user
  public/private
*/
const mongoose = require('mongoose');

const VideoScema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  title:{
      type: String,
      required: true //you must have a title!
  },
  description:{
      type: String,
      required: true //you must have a description!
  },
  videoID:{
      type: String,
      required: true //you must embed something!
  },
  status: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
      default: 'PRIVATE'
  }
},{
  timestamps: true,
  toJSON:{
    getters: true,
  }
});

//query helpers
VideoScema.query.drafts = function () {
  return this.where({
      status: 'PUBLIC'
  })    
};
VideoScema.query.published = function () {
  return this.where({
      status: 'PRIVATE'
  })    
};


module.exports = mongoose.model('Video', VideoScema);