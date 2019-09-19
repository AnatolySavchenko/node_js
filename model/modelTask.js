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

module.exports = mongoose.model('Task',schemeTask);
