create database safeguard;
use safeguard;
set SQL_SAFE_UPDATES=0;
    create table signupfirst(
	UserName varchar(100) not null,
    MobileNo bigint unique not null,
    Emergency bigint not null,
    UserPassword bigint not null
    );    
select * from signupfirst