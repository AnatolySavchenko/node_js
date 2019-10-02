const User = require('../model/modelUser');


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
	}
	else {
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
			if (item.password !== req.body.password){
				res.send('Not correct password').end()
			}else{
				res.send(item.userName).end();
			}
		}
	});
};

