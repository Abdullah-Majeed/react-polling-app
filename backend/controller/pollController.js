const Poll = require('../models/pollModel');
const mongoose = require('mongoose');
// get all polls
const getPolls = async (req, res) => {
    const user_id = req.user._id;
    const polls = await Poll.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(polls);
}

const getPoll = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such poll" })
    }
    const poll = await Poll.findById(id);

    if (!poll) {
        return res.status(404).json({ error: "No such poll" })
    }
    res.status(200).json(poll);
}

const createPoll = async (req, res) => {
    const { question, options, image } = req.body;
    let emptyFields = [];
    if (!question) {
        emptyFields.push('question')
    }
    if (!options || options.length < 2 || options.length > 5) {
        emptyFields.push('options')
    }
    if (!image) {
        emptyFields.push('image')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const user_id = req.user._id
        const poll = await Poll.create({ question, options, image, user_id });
        res.status(200).json(poll);
    }
    catch (e) {
        res.status(404).json({ error: e.message });
    }
}

const deletePoll = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such poll' });
    }
    const poll = await Poll.findOneAndDelete({ _id: id });
    if (!poll) {
        return res.status(404).json({ error: 'No such poll' });
    }
    res.status(200).json(poll);
}

const updatePoll = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such poll' });
    }
    const poll = await Poll.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!poll) {
        return res.status(404).json({ error: 'No such poll' });
    }
    return res.status(200).json(poll);
}

module.exports = { getPolls, getPoll, createPoll, deletePoll, updatePoll }