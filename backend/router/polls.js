const express = require('express');
const requireAuth = require('../middleware/requireAuth')
const { getAllPolls, getUserPolls, getPoll, createPoll, deletePoll, updatePoll, updatePollVote } = require('../controller/pollController')

const router = express.Router();

// VOTING API WITHOUT AUTHORIZATION
router.patch('/vote/:id', updatePollVote);

// GET ALL POLLS WITH AUTHORIZATION
router.get('/all', getAllPolls)

// AUTHORIZATION MIDDLEWARE
router.use(requireAuth);

// GET AUTHENTICATED USER POLLS
router.get('/', getUserPolls);

// GET INDIVIDUAL AUTHENTICATED USER POLLS
router.get('/:id', getPoll);

// CREATE A NEW POLL 
router.post('/', createPoll);

// DELETE SPECIFIC USER POLL
router.delete('/:id', deletePoll);

// UPDATE SPECIFIC USER POLL
router.patch('/:id', updatePoll);

module.exports = router;