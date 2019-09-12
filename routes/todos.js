const express = require('express');
const router = express.Router();

let todolist = [];

router.get('/', (req, res, next) => {
	res.send(todolist);
});

router.post('/', (req, res, next) => {
	todolist.push(req.body);
	res.send(todolist);
});

router.put('/', (req,res,next) => {
	let arrayAfterDelete = req.body.data;
	console.log('--------req.body', req.body.data);
	
	if(arrayAfterDelete.every(item => item.status)) {
		todolist.forEach(item => item.status = true);
	} else if ((arrayAfterDelete.every(item => item.status)) === false) {
		todolist.forEach(item => item.status = false);
	}
	res.send(todolist);
});

router.put('/:id', (req, res, next) => {
	let idElement = +(req.params.id);
	todolist.forEach((item, i) => {
		if(item.id === idElement){
			todolist[i].value = req.body.value;
			todolist[i].status = req.body.status;
		}
	});
	res.send(todolist);
});



router.delete('/',(req, res, next) => {
	todolist = req.body;
	console.log(todolist);

	res.send(todolist);
});

router.delete('/:id', (req, res, next) => {
	let attributeElement = req.body.id;
	todolist.forEach((item, i) => {
		if (item.id === attributeElement) {
			todolist.splice(i, 1);
		}
	});
	res.send(todolist);
});


module.exports = router;
