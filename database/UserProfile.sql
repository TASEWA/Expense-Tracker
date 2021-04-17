CREATE TABLE UserProfile (   
					id numeric(20) unique,
				    Name char(20)  ,
				     Username varchar(20) null,
				    Password varchar(20) ,
				    Email_Id varchar(50) unique , 
					primary key(id)
				  );
