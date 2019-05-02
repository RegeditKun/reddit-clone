const uniqid = require('uniqid');

const database = [];

exports.create = (req, res) => {
  const newTopic = {};
  newTopic.id = uniqid();
  newTopic.title = req.body.title;
  newTopic.upVote = 0;
  newTopic.downVote = 0;
  if (newTopic.title.length > 255) {
    return res.json({
      success: false,
      message: 'Max character is no more than 255',
    });
  }
  database.push(newTopic);
  return res.json({
    success: true,
    message: 'New Topic Created',
    data: newTopic,
  });
};

exports.upVote = (req, res) => {
  for (let i = 0; i < database.length; i += 1) {
    if (database[i].id === req.params.id) {
      database[i].upVote += 1;
      return res.json({
        success: true,
        message: 'Up Vote Success',
      });
    }
  }
  return res.json({
    success: false,
    message: 'Topic Id not found',
  });
};

exports.downVote = (req, res) => {
  for (let i = 0; i < database.length; i += 1) {
    if (database[i].id === req.params.id) {
      database[i].downVote += 1;
      return res.json({
        success: true,
        message: 'Down Vote Success',
      });
    }
  }
  return res.json({
    success: false,
    message: 'Topic Id not found',
  });
};

exports.showTopics = (req, res) => {
  const dataSort = database.sort((a, b) => b.upVote - a.upVote).slice(0, 20);
  if (dataSort.length === 0) {
    return res.json({
      success: false,
      message: 'Please Insert a Topic First',
    });
  }
  return res.json({
    success: true,
    message: 'Show Database, Sort by Upvote Descending',
    data: dataSort,
  });
};
