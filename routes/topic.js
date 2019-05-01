const express = require('express');
const router = express.Router();

const topicControl = require('../controllers/topic');

router.post('/create', topicControl.create);
router.put('/upvote/:id', topicControl.upVote);
router.put('/downvote/:id', topicControl.downVote);
router.get('/showtopics', topicControl.showTopics);

module.exports = router;
