const express = require('express');
const router = express.Router();

const todolist = [
	{
		id: 0,
		status: false,
		value: "1",
	},
	{
		id: 1,
		status: false,
		value: "2",
	},
	{
		id: 2,
		status: false,
		value: "3",
	}
];

router.get('/', (req, res, next) => {
	res.send(todolist);
});

router.post('/', (req, res, next) => {
	console.log('--------req.body', req.body);
	todolist.push(req.body);
	res.send(todolist);
});

router.put('/:id', (req, res, next) => {
	res.send(todolist);
});

router.delete('/:id', (req, res, next) => {
	res.send(todolist);
});

module.exports = router;
