const uniqid = require('uniqid')
let database = []

exports.create = (req, res) => {
	const newTopic = {}
	newTopic.id = uniqid()
	newTopic.title = req.body.title
	newTopic.upVote = 0
	newTopic.downVote = 0
	if (newTopic.title.length > 255) {
		return res.json({
			success: false,
			message: 'Max character is no more than 255'
		})
	}
	database.push(newTopic)
	return res.json({
		success: true,
		message: 'New Topic Created',
		data: newTopic
	})
}

exports.upVote = (req, res) => {
	for (let i = 0; i < database.length; i++) {
		if (database[i].id == req.params.id) {
			database[i].upVote += 1
			return res.json({
				success: true,
				message: 'Up Vote Success'
			})
		}
	}
	return res.json({
		success: false,
		message: 'Topic Id not found'
	})
}

exports.downVote = (req, res) => {
	for (let i = 0; i < database.length; i++) {
		if (database[i].id == req.params.id) {
			database[i].downVote += 1
			return res.json({
				success: true,
				message: 'Down Vote Success'
			})
		}
	}
	return res.json({
		success: false,
		message: 'Topic Id not found'
	})
}

exports.showTopics = (req, res) => {
	if (database.length == 0) {
		return res.json({
			success: false,
			message: 'Please Create Some Topic First'
		})
	}
	return res.json({
		success: true,
		message: 'Showing Topic',
		data: database
	})
}