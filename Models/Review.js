const {Schema, model} = require('mongoose')

const ReviewSchema = new Schema ({
   dateAndTime : {
    type : 'Date',
    required : true
   },
   content : {
    type: 'String',
    required : true
   },
   userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});
const ReviewModel= model('review',ReviewSchema);
module.exports=ReviewModel;