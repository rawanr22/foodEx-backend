const { Schema, model} = require('mongoose');

const OrderSchema = new Schema({
    summary: {
        type: 'String',
        required: true
    },
    status: {
        type: 'String',
        required: true
    },
    total: {
        type: 'Number',
        required: true
    },
    dateAndTime: {
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
      }

});
const OrderModel= model('order',OrderSchema);

module.exports=OrderModel;