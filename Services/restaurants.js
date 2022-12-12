const { ObjectId } = require('mongoose').Types;

const RestaurantModel = require('../models/Restaurant');


module.exports.addNewRestaurant = async (RestaurantInfo) => {
  try {
    const restaurant = new RestaurantModel({
      name: RestaurantInfo.name,
      location: RestaurantInfo.location,
      category : RestaurantInfo.category,
      rate: RestaurantInfo.rate,
      menuURL: RestaurantInfo.menuURL
    });
    const createdRestaurant = await restaurant.save();
    return createdRestaurant;
  } catch (err) {
    throw new Error('Could not create restaurant.');
  }
};

module.exports.removeRestaurant = async (restaurantId) => {
  try {
    await RestaurantModel.deleteOne({ _id: restaurantId });
  } catch (err) {
    throw new Error('Could not remove restaurant.');
  }
};

module.exports.updateRestaurant = async (restaurantId,newInfo) => {
  try {
    const updatedRestaurant = await RestaurantModel.updateOne(restaurantId,newInfo);
    return updatedRestaurant;
  }catch (err) {
    throw new Error('Could not update restaurant.');
}
};

module.exports.viewRestaurant = async () => {
  try {
    const restaurants = await RestaurantModel.find();
    return restaurants;
  } catch (err) {
    throw new Error('Could not retrieve restaurants.');
  }
};
