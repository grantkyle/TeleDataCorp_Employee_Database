USE employee_cms;

INSERT INTO department (name) 
VALUES 
("Management"), ("Cubicle Rats"), ("Karens"), ("Toilet Cleaners");

INSERT INTO role
(title, salary, department_id)
VALUES 
("CEO", 550000.00, 1),
("Executive Assistant to the CEO", 290000.00, 1),
("Administrative Supervisor", 155000.00, 1),
("Account Executive", 75000.00, 2),
("Marketing Analyst", 70000.00, 2),
("Sales Development Representative", 45000.00, 2),
("Senior Office Karen", 52000.00, 3),
("Junior Office Karen", 42000.00, 3),
("Hairstylist to Karen", 38000.00, 3),
("Head of Sanitation", 69000.00, 4),
("Assistant Sanitation Specialist", 66600.00, 4),
("Junior Toilet Scrubber", 42000.00, 4);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES
("Charlie","Parker", 1, null),
("Ali-Akbar","Khan", 1, null),
("Les","Claypool", 2, 1),
("Travis","Scott", 2, 1),
("Herbie","Hancock", 2, 2),
("Kim","Deal", 3, 2),
("Geddy","Lee", 4, 2);



 

