const express = require('express');
const requireAuth = require('../middleware/requireAuth')
const { getPolls, getPoll, createPoll, deletePoll, updatePoll } = require('../controller/pollController')

const router = express.Router();

// authorization check
router.use(requireAuth);
// GET all polls
router.get('/', getPolls);

// GET a single poll
router.get('/:id', getPoll);

// POST a new poll
router.post('/', createPoll);

// DELETE a poll
router.delete('/:id', deletePoll);

// UPDATE a poll
router.patch('/:id', updatePoll);

module.exports = router;