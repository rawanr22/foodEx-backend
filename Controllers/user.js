const User = require('../Models/User')

module.exports.favRes = async (req, res) => {
    const resID = req.params.id
  
    const user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { favRes: resID } }
    ).exec()
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('Failed to fav Restaurant.')
    }
  }
  module.exports.favDish = async (req, res) => {
    const Dish = req.params.menu
  
    const user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { favDish: Dish } }
    ).exec()
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('Failed to fav Dish.')
    }
  }