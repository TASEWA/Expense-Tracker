update Expense
Set Expense_amount= 65000 where Expense_id=2;

update Income
Set Income_amount= 10000 where Income_id=4;


update Expense
Set Expense_amount= 35000 where Expense_id=3;

update Expense_Tracker
Set total_income= 370000 where id=1;

Delete from Expense where Expense_id=1;
Delete from Income where Income_id=1;


