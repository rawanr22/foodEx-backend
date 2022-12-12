const { Schema, model} = require('mongoose');
const { ObjectId } = mongoose.Schema

const UserSchema = new schema({
    name: {
        type: 'String',
        required: true
    },
    username: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    phoneNumber: {
        type: 'Number',
        required: true
    },
    address: {
        type: 'String',
        required: true
      },
    location:{
        latitude: {
            type: 'number',
            required: true
        },
        longitude: {
            type: 'number',
            required: true
        }
    },
    gender: {
        type: 'String',
        required: false
    },
    age: {
        type: 'Number',
        required: false
    },
    role: {
        type: String,
        default: 'customer',
      },
      favRes: [{ type: ObjectId, ref: 'Resturant' }],
      favDish: [{ type: ObjectId, ref: favRes.menu }]
});
const UserModel = model('user', UserSchema);

module.exports = UserModel;