const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/',todoController.createTask);
router.get('/',todoController.getAllTask);
router.put('/',todoController.updateAll);
router.put('/:id',todoController.updateTask);
router.delete('/',todoController.deleteAllTaskComplited);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

/*
let todolist = [];

router.get('/', (req, res, next) => {
	todolist.forEach((item,i) => {
		item.id = i
	});
	res.send(todolist);
});

router.post('/', (req, res, next) => {
	todolist.push(req.body);
	res.send(todolist);
});

router.put('/', (req,res,next) => {
	let arrayAfterDelete = req.body.data;

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
	res.send(todolist);
});

router.delete('/:id', (req, res, next) => {
	console.log(req.body);
	let attributeElement = req.body.id;
	todolist.forEach((item, i) => {
		if (item.id === attributeElement) {
			todolist.splice(i, 1);
		}
	});
	res.send(todolist);
});

 */
