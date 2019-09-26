const User = require('../model/modelUser');


exports.createUser = async (req, res) => {
	const user = await new User({
		userName: req.body.userName,
		password: req.body.password
	});
	
	const users = await User.find({});

console.log('--------user', user);
console.log('--------users', users);


			user.save((err, user) => {
				res.status(200).json(user);
			});

	res.send('ok')

	// users.forEach(item => {
	// 	if (item.userName === req.body.userName) {
	// 		res.send('Its user have!');
	// 	}else	if(req.body.passwordCheck !== req.body.password){
	// 		res.send('passwords do not match');
	// 	}else{
	// 		res.send('ok');
	// 		user.save((err, user) => {
	// 			res.status(200).json(user);
	// 		})
	// 	}
	// });
};

exports.getUser = async (req, res) => {

	const user = await User.findOne({
		userName: req.body.userName
	});

	const users = await User.find({});

	let testArr = [...users];

	if (user === null) {
		res.send('No user')
	}

	testArr.forEach(item => {
		if (item.userName === req.body.userName) {
			if (item.password !== req.body.password) res.send('no password');
		}
	});


	res.send('ok');
};

