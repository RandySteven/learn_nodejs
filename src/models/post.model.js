const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
// .method("toJSON", () => {
//     const {__v, _id, ...object} = this.toObject()
//     object.id = _id
//     return object
// })


module.exports = mongoose.model("Post", PostSchema)