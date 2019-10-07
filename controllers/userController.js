const User = require('../model/modelUser');

exports.getAllUser = (req, res) => {
	User.find({})
		.then(task => res.send(task))
		.catch(e => res.send(e))
};

exports.createUser = async (req, res) => {
	const user = new User({
		userName: req.body.userName,
		password: req.body.password
	});

	const users = await User.find({});


	const arrayUserNames = users.map(item => item.userName);
	let nameNewUser = req.body.userName;
	const passwordNewUser = req.body.password;
	const arrayForPassword = passwordNewUser.split('');
	let message = '';

	arrayUserNames.forEach(item => {
		if (item === nameNewUser.trim()) {
			message = "it's User registered";
			res.send(message).end();
		}

	});

	arrayForPassword.forEach(char => {
		if (char === ' ') {
			message = 'Your password have spaces,please rewrite';
			res.send(message).end();
		}
	});

	if (passwordNewUser.length < 6) {
		message = 'Your password very short, you need have min 6 symbols';
		res.send(message).end();
	}

	if (user.password !== req.body.passwordCheck) {
		message = 'Your password  not match with field check password';
		res.send(message).end();
	} else {
		user.save((err, user) => {
			res.status(200).json(user).end();
		});
	}


};

exports.getUser = async (req, res) => {

	const user = await User.findOne({
		userName: req.body.userName
	});

	const users = await User.find({});

	let testArr = [...users];

	if (user === null) {
		res.send('Not find User').end();
	}

	testArr.forEach(item => {
		if (item.userName === req.body.userName) {
			if (item.password !== req.body.password) {
				res.send('Not correct password').end()
			} else {
				res.send(item.userName).end();
			}
		}
	});
};


exports.getTasks = async (req, res) => {

	let users = await User.find({});

	users.forEach(item => {
		if (item.userName === req.body.user) {
			res.send(item.task);
		}
	})
};


exports.createTask = async (req, res) => {

	const newItem = {
		status: false,
		classNameEdited: req.body.classNameEdited,
		value: req.body.value,
		_id: new Date().valueOf()
	};

	User.update(
		{userName: req.body.userName},
		{$push: {task: newItem}}, () => {
			res.send(newItem);
		}
	)
};

exports.updateTask = (req, res) => {


	let taskUpdate = req.body.todos;

	console.log('--------taskUpdate', taskUpdate);

	taskUpdate[req.body.i].classNameEdited = '';

	User.updateOne({userName: req.body.userName},
		{$set: {task: taskUpdate}}, ()=>{
			res.send(taskUpdate)
		});
};

exports.updateAll = (req, res) => {

	let taskUpdate = req.body.todos;

	taskUpdate.forEach(item => {
		if (item.status !== req.body.data) {
			item.status = req.body.data
		}
	});

	User.updateOne({userName: req.body.userName},
		{$set: {task: taskUpdate}}, ()=>{
			res.send(taskUpdate)
		});


};

exports.deleteTodo =  (req, res) => {

	let todosAfterDelete = req.body.todos;

	todosAfterDelete.forEach((item,i) => {
		if(item._id === req.body.id){
			todosAfterDelete.splice(i,1);
		}
	});

	User.updateOne({userName: req.body.userName},
		{$set: {task: todosAfterDelete}}, ()=>{
			res.send(todosAfterDelete)
		});


};
exports.deleteAllTaskComplited = (req, res) => {

	let todosAfterDelete = req.body.todos.filter(item => !item.status);

	User.updateOne({userName: req.body.userName},
		{$set: {task: todosAfterDelete}}, ()=>{
			res.send(todosAfterDelete)
		});

};



