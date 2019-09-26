const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const schemeUser = new Scheme({
	userName:{
		type: String,
		index:{
			unique:true
		}
	},
	password: String,
});

module.exports = mongoose.model('User',schemeUser);
