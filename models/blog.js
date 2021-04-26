const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema defines the structure of the documents that are later stored inside a collection, thing that a model wraps around.

const blogSchema = new Schema({
    title: {
        type: String,
        required: true //required field makes it necessary for this blogSchema.title to exist
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });//next, we create a model.  Schema defines structure of document, models surrounds that and provides an interface in order to communicate with the databse of that document type
//note that you do not have to add in the timestamps parameter as mongoose will enter this by default.

const Blog = mongoose.model('Blog', blogSchema); //looks for "Blogs", notice it pluralizes it by default
module.exports = Blog; //exports the Blog model.
