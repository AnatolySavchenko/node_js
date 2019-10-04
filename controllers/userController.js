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


exports.getTasks = (req, res) => {
	User.find({})
		.then(task => res.send(task))
		.catch(e => res.send(e))

	// let users = await User.find({});
	//
	// if (req.body.value) {
	//
	// 	users.forEach(item => {
	// 		if (item.userName === req.body.userName) {
	// 			const newItem = {
	// 				status: false,
	// 				classNameEdited: req.body.classNameEdited,
	// 				value: req.body.value
	// 			};
	//
	// 			const task = [...item.task, newItem];
	//
	// 			task.save
	//
	//
	// 			res.send(task);
	// 		}
	// 	})
	// } else {
	// 	let userName = req.body.userName;
	// 	users.forEach(item => {
	// 		if (userName === item.userName) {
	// 			res.send(item.task);
	// 		}
	// 	})
	// }

	// .then(task => res.send(task))
	// .catch(e => res.send(e))
};


exports.createTask = async (req, res) => {

		console.log('eeeeee', req.body);


	const newItem = {
		status: false,
		classNameEdited: req.body.classNameEdited,
		value: req.body.value
	};

	User.update(
		{ userName: req.body.userName },
		{ $push: { task: newItem }}, () => {
			res.send('ok');
		}
	)
	// User.findOne({userName: req.body.userName}, (err, user) => {
	// 	if (err) return console.log(err);
	//
	// 	let test = user.task;
	// 	test.push(newItem);
	// 	console.log('--------tes', test);
	// }).updateOne({task: '111111'}, () => {
	// 	res.send('ok');
	// });



// let users = await User.findOne({userName: req.body.userName}, (res) => {
// 	console.log('res', res);
// });
// 	console.log('asdasdasdasd', users);
// 	res.send('ok');
	// users.forEach(item => {
	// 	if (item.userName === req.body.userName) {
	// 		const newItem = {
	// 			status: false,
	// 			classNameEdited: req.body.classNameEdited,
	// 			value: req.body.value
	// 		};
	//
	//
	// 	//	const task = [...item.task, newItem];
	//
	// 		console.log('--------here');
	//
	// 		User.findById(item._id).updateOne({
	// 			userName: 'asdfgh'
	// 		});
	// 			res.send('ok');
	// 	}
	// })
};

// .then(task => res.send(task))
// .catch(e => res.send(e))


// exports.createTask = (req, res) => {
// 	const task = new Task({
// 		classNameEdited: req.body.classNameEdited,
// 		value: req.body.value
// 	});
// 	task.save((err, task) => {
// 		res.status(200).json(task);
// 	})
// };
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



