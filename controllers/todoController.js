const Task = require('../model/modelTask');

exports.createTask = (req, res) => {
	const task = new Task({
		classNameEdited: req.body.classNameEdited,
		value: req.body.value
	});
	task.save((err, task) => {
		res.status(200).json(task);
	})
};
exports.getAllTask = (req, res) => {
	Task.find({})
		.then(task => res.send(task))
		.catch(e => res.send(e))
};
exports.updateTask = (req, res) => {
	Task.findById(req.params.id).updateOne({
		value: req.body.value,
		status: req.body.status
	})
		.then(() => {
			Task.find({})
				.then(task => {
					res.send(task);
				})
				.catch(e => res.send(e));
		})
		.catch(err => res.send(err))
};

exports.updateAll = (req, res) => {
	Task.find({}).updateMany({}, {status: req.body.data})
		.then(() => {
			Task.find({})
				.then(task => {
					res.send(task);
				})
				.catch(e => res.send(e));
		})
		.catch(err => res.send(err))
};

exports.deleteTodo = (req, res) => {
	Task.findById(req.params.id).deleteOne()
		.then(() => {
			Task.find({})
				.then(task => {
					res.send(task);
				})
				.catch(e => res.send(e));
		})
		.catch(err => res.send(err));
};
exports.deleteAllTaskComplited = (req, res) => {
	Task.find({status: true}).deleteMany()
		.then(() => {
			Task.find({}).then(task => {
				res.send(task);
			})
				.catch(e => res.send(e));
		})
		.catch(err => res.send(err));
};


