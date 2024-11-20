const Poll = require('../models/pollModel');
const mongoose = require('mongoose');
// get all polls
const getPolls = async (req, res) => {
    const polls = await Poll.find({}).sort({ createdAt: -1 });
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
    try {
        const poll = await Poll.create({ question, options, image });
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