const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const schemeTask = new Scheme({
	classNameEdited:String,
	value: String,
	status:{
		type:Boolean,
		default:false
	}
});

const schemeUser = new Scheme({
	userName:{
		type: String,
		index:{
			unique:true
		}
	},
	password: String,
	task: [schemeTask]
});

module.exports = mongoose.model('User',schemeUser);
