const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = 8000;
const pool = require('./db');

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(cors());
app.use(express.json());

//request to accept body
app.get('/', (req, res) => {
    res.send('Crashed!');
});

app.get('/list', function(req, res, next) {

	pool.query('SELECT * FROM expense', function(error, results, fields){
		res.send(results);
	});
});

app.get('/get_expense_tracker_details', function(req, res, next) {

	pool.query('SELECT * FROM expense_tracker', function(error, results, fields){
		res.send(results);
	});

});

app.get('/get_income_details',function(req,res,next){
	pool.query('SELECT * FROM income' , function(error, results, fields){
		res.send(results);
	});
});

app.get('/get_user_details', function(req, res, next) {

	pool.query('SELECT * FROM userProfile WHERE id = 3', function(error, results, fields){
		res.send(results);
	});
});

app.post('/update_balance', function(req, res, next) {
	const {bal} = req.body;

	pool.query('UPDATE expense_tracker SET total_balance = ?', [bal], function(error, results, fields){
		res.send(results);
	});
});

app.get('/get_total_income' , async function(req, res, next) {

	pool.query('update expense_tracker set total_income = (select sum(amount) from income)', function(error, results, fields){
		res.send(results);
	});

});
app.post('/post_account_user_details', async function(req, res, next) {
	
	const { name } = req.body;
        const { username } = req.body;
        const { password } = req.body;
	const { email } = req.body;

	let sql = 'INSERT into  userProfile (id, name, username, password, email) VALUES ((SELECT count(*)+1 FROM userProfile), ?, ?, ?)';

	await pool.query(sql, [name, username, password, email], function(error, results, fields)
	{
  		if (error)
    			return console.error(error.message);
  		
  		console.log('Rows affected:', results.affectedRows);
	});
});

app.post('/post_credentials', async function(req, res, next) {

	
        const { username } = req.body;
        const { password } = req.body;
	
	let sql = 'SELECT * FROM userProfile where username = ? and password = ?';

	await pool.query(sql, [ username, password], function(error, results, fields)
	{
  		if (error)
    			return console.error(error.message);
  		
  		console.log('Rows affected:', results.affectedRows);
	});
});

app.post('/post_user_details', async function(req, res, next) {

	const { name } = req.body;
        const { username } = req.body;
        const { password } = req.body;
	const { email } = req.body;

	let sql = 'UPDATE userProfile set name = ?, username = ?, password = ?, email = ? where id = 3';

	await pool.query(sql, [name, username, password, email], function(error, results, fields)
	{
  		if (error)
    			return console.error(error.message);
  		
  		console.log('Rows affected:', results.affectedRows);
	});
});

app.post('/post_expense_details', async function(req, res, next) {

	const { id } = req.body;	
	const { name } = req.body;
    	const { number } = req.body;
	const { date } = req.body;

	let sql = 'INSERT INTO expense values (?, ?, ?, ?, ?)';

	await pool.query(sql, ['3', id, name, number, date], function(error, results, fields)
	{
  		if (error)
    			return console.error(error.message);
  		
  		console.log('Rows affected:', results.affectedRows);
	});
})

app.post('/post_Income_details', async function(req, res, next) {
	const { id } =req.body;
	const { name } = req.body;
	const { number } = req.body;
	const { date } = req.body;
	
	let sql = 'INSERT INTO income values (?, ?, ?, ?, ?)';
	
	await pool.query(sql,['3', id, name, number, date],function(error,results,fields){
		if(error)
			return console.error(error.message);
		
		console.log('Rows affected:',results.affectedRows);
	});
})
app.post('/update_expense_details', async function(req, res, next) {

	
	const { id } = req.body;	
	const { name } = req.body;
    	const { number } = req.body;

	let sql = 'UPDATE expense SET item = ?, amount = ? WHERE expense_id = ?';

	await pool.query(sql, [name, number, id], function(error, results, fields)
	{
  		if (error)
    			return console.error(error.message);
  		
  		console.log('Rows affected:', results.affectedRows);
	});
});

app.post('/update_income', async function(req, res, next){
	
	const{ id }= req.body;
	const{ name } = req.body;
	const { number } = req.body;
	
	let sql = 'UPDATE income SET item = ?, amount = ? WHERE income_id = ?';
	
	await pool.query(sql, [name, number, id], function(error, results, fields)
	{
		if(error)
			return console.error(error.message);
		
		console.log('Rows affected:', results.affectedRows);
	});
	
});
	
app.post('/delete_expense', async function(req, res, next) {
	
	const { id } = req.body;	

	let sql = 'DELETE FROM expense WHERE expense_id = ?';

	await pool.query(sql, [id], function(error, results, fields)
	{
  		if (error)
    			return console.error(error.message);
  		
  		console.log('Rows affected:', results.affectedRows);
	});
});

app.post('/delete_income', async function(req, res, next) {
	
	const { id }=req.body;
	
	let sql= 'DELETE FROM income WHERE income_id=?';
	
	await pool.query(sql,[id], function(error, results,fields)
	{
		if(error)
			return console.error(error.message);
		
		console.log('Rows affected:', results.affectedRows);
	});
});

app.get('/get_total_expense' , async function(req, res, next) {

	pool.query('update expense_tracker set total_expense = (select sum(amount) from expense)', function(error, results, fields){
		res.send(results);
	});

});

app.get('/get_expense_graph_details', function(req, res, next) {

	pool.query('SELECT * FROM expense', function(error, results, fields){
		res.send(results);
	});
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
