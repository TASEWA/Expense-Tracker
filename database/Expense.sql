CREATE TABLE Expense( Expense_id serial  primary key,
				   Expense_item char(20) not null,
					 Expense_amount char(10)  not null,
					 Expense_Date DATE not null
				  );

CREATE TABLE Income( Income_id serial  primary key,
				     Income_item char(20) not null,
					 Income_amount char(10) not null,
					 Income_Date DATE not null
				  );
CREATE TABLE Expense_Tracker (   
							  id int ,
				              Total_income int ,
					          Total_expense int ,
					          Total_balance int ,
	                          foreign key (id) references UserProfile(id)
				             );
