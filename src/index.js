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

//create a list
/*app.post("/list",async(req,res)=>{
try {
    const { Expense_item } = req.body;
    const newExpense = await pool.query("INSERT INTO Expense (Expense_item) VALUES($1) RETURNING *, 
    [Expense_item]
	);

    res.json(newExpense);

    console.log(req.body);
} catch (error) {
    console.error(err.message);
}
})*/
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
