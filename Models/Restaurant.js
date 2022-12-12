const {schema, model} = require('mongoose')

const RestaurantSchema = new Schema ({
    name: {
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
    category: {
        type: 'String',
        required: true
    },
    rate: {
        type: 'Number',
        required: true
    },
    menu: {
        type: 'String'

    }

});
const RestaurantModel = model('restaurant', RestaurantSchema);

module.exports = RestaurantModel;