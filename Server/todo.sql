create table task(
	id serial primary key,
	description varchar(255)
)

insert into task (description) values ('test 2')

create table account (
	id serial primary key,
	email varchar(50) unique not null,
	password varchar(255) not null
)