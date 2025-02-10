create database safeguard;
use safeguard;

    create table signupfirst(
	UserName varchar(100) not null,
    MobileNo bigint unique not null,
    Emergency bigint not null,
    UserPassword bigint not null
    );
drop table signup;
    