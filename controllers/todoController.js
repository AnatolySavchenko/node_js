const Task = require('../model/modelTask');

exports.createTask = function (req,res) {
	const task = new Task({
		value: req.body.value
	});
	task.save((err, task) => {
		res.status(200).json(task);
	})
};
exports.getAllTask = function (req,res) {
		Task.find({})
			.then(task => res.send(task))
			.catch( e => res.send(e))
};
exports.updateTask = function(req,res){
	Task.findById(req.params.id).updateOne({ value: req.body.value, status: req.body.status })
		.then(res => console.log(res))
};

exports.updateAll = function (req,res) {
	console.log(req.body);
	Task.find({}).updateMany({},{status:req.body.data})
		.then(tasks => res.send(tasks))
		.catch(err => res.send(err))
};

exports.deleteTodo = function (req,res) {
	Task.findById(req.params.id).deleteOne()
		.then(tasks => res.send(tasks))
		.catch(err => res.send(err));
};
exports.deleteAllTaskComplited = function(req,res){
	Task.find({status: true}).deleteMany()
		.then(tasks => res.send(tasks))
		.catch(err => res.send(err));
};


