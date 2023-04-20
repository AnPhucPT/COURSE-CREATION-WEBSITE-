const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;


const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name' },
    video_id: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});

//custom query helper
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this;
}

//add plugins
Course.plugin(mongooseDelete,
    {
        deletedAt: true,
        overrideMethods: 'all'
    });
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);