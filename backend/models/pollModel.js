const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (options) => {
                return options.length >= 2 && options.length <= 5
            }
        }
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);