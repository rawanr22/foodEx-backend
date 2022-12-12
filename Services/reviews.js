const { ObjectId } = require('mongoose').Types;

const ReviewModel = require('../models/Review');


module.exports.submitReview = async (ReviewInfo) => {
  try {
    const review = new ReviewModel({
        dateAndTime : new CurrentDate(),
        content: ReviewInfo.content,
        userId: new ObjectId(ReviewInfo.userId)
    });
    const submittedReview = await review.save();
    return submittedReview;
  } catch (err) {
    throw new Error('Could not submit review.');
  }
};

module.exports.removeReview = async (reviewId) => {
  try {
    await ReviewModel.deleteOne({ _id: reviewId });
  } catch (err) {
    throw new Error('Could not remove review.');
  }
};

module.exports.updateReview = async (reviewId,newInfo) => {
  try {
    const updatedReview = await ReviewModel.updateOne(reviewId,newInfo);
    return updatedReview;
  }catch (err) {
    throw new Error('Could not update review.');
}
};

module.exports.viewReview = async () => {
  try {
    const reviews = await ReviewModel.find();
    return reviews;
  } catch (err) {
    throw new Error('Could not retrieve reviews.');
  }
};
