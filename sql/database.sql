CREATE DATABASE NodejsMysql;

USE NodejsMysql;

CREATE TABLE USER(
  id int  primary key auto_increment,
  name varchar(20) not null,
  lastName varchar(20) not null,
  age int not null,
  createAt timestamp default current_timestamp
);

-- sp para listar usuarios
CREATE PROCEDURE sp_list_user ()
select * from USER 
order by createAt desc;


CALL sp_list_user();

-- sp para crear usuario

create procedure sp_create_user(new_name varchar(20),
  new_lastName varchar(20),
  new_age int)
insert into user(name,lastName,age) values(new_name,new_lastName,new_age);


call sp_create_user('Juan','Falcón',22);

-- sp para actualizar usuario

create procedure sp_update_user(new_id int,new_name varchar(20),
  new_lastName varchar(20),
  new_age int)
update User set name=new_name,lastName=new_lastName,age=new_age where id=new_id;

call sp_update_user(1,'Paquito','Cordova',18);

-- sp  de usuario por id
create procedure sp_user_id(new_id int)
select * from User where id=new_id;

call  sp_user_id(1);

-- sp delete user

create procedure sp_delete_user(new_id int)
delete  from User where id=new_id;

call sp_delete_user(4);



