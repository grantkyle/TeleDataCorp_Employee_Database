DROP DATABASE IF EXISTS employee_cms;

CREATE DATABASE employee_cms;

USE employee_cms;

DROP TABLE IF EXISTS employee, role, department;

CREATE TABLE department(
id INTEGER AUTO_INCREMENT,
name VARCHAR(60),
PRIMARY KEY(id)
);

CREATE TABLE role(
id INTEGER AUTO_INCREMENT,
title VARCHAR(60),
salary DECIMAL,
department_id INTEGER,
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INTEGER AUTO_INCREMENT,
first_name VARCHAR(60) NOT NULL,
last_name VARCHAR(60) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
PRIMARY KEY(id)
);



