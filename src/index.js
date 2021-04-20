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

pp.get('/list',async(req,res)=>{
    try {
    
    const expdetails=await pool.query("SELECT * FROM Expense");
    res.json(expdetails);
    } catch (error) {
    console.error(err.message);
    }
    });
//get

app.post("/list", async(req, res) => {
    try {
        const { Expense_item } = req.body;
        const { Expense_amount } = req.body;
        const { Expense_date } = req.body;
        const newExpense = pool.query("INSERT INTO Expense (Expense_item,Expense_amount,Expense_date) VALUES($1) RETURNING *", [Expense_item], [Expense_amount], [Expense_date]);
        res.json('Inserted!');
        console.log(req.body);
    } catch (err) { console.log(err.message); }

});
//post


app.delete("/list", async(req, res) => {​​​​​
    try {​​​​​
        const {​​​​​ id }​​​​​ = req.params;
        const {​​​​​ expense_id }​​​​​ = req.params;
        const {​​​​​ expense_amount }​​​​​ = req.params;
        const {​​​​​ expense_item }​​​​​ = req.params;
        const {​​​​​ expense_date }​​​​​ = req.params;
        const deleteexpense = awaitpool.query("DELETE FROM Expense WHERE expense_id = $1", [id]);
        res.json("Deleted!");
    }​​​​​ catch (err) {​​​​​
        console.log(err.message);
    }​​​​​
}​​​​​);
​//delete

app.put("/list", async (req, res) => {
    try {
      const { id } = req.params;
      const { Expense_amount } = req.body;
      const updateexpense = await pool.query(
        "UPDATE list SET Expense_amount = $1 WHERE Expense_id = $2",
        [Expense_amount, id]
      );
  
   
  
      res.json("updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
//update

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
