CREATE TABLE expense( 			
					 id int ,
					 expense_id serial  primary key,
				    	 item varchar(20),
					 amount numeric(11, 2),
					 expense_date DATE,
					foreign key (id) references userProfile(id)
				  );

CREATE TABLE income( 			 
					 id int ,
					 income_id serial  primary key,
				    	 item varchar(20),
					 amount numeric(11, 2),
					 income_date DATE,
					foreign key (id) references userProfile(id)
				  );
CREATE TABLE expense_tracker (   
					      id int ,
				              total_income numeric(11, 2),
					      Total_balance numeric(11, 2),
					      Total_expense numeric(11, 2),
	                          foreign key (id) references userProfile(id)
				             );
