
INSERT INTO department (name)
VALUES
    ("HR"),
    ("Sales"),
    ("Accounting"),
    ("Warehouse");


INSERT INTO role (title, salary, department_id)
VALUES
    ("HR Team Manager", 120000, 1),
    ("HR Team", 80000, 1),
    ("Sales Manager", 150000, 2),
    ("Salesperson", 95000, 2),
    ("Accounting Manager", 75000, 3),
    ("Accountant", 65000, 3),
    ("Warehouse Manager", 55000, 4),
    ("Warehouse", 40000, 4);




INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
        ("Karly", "Weatherstein", 1, 2),
        ("Diane", "Smith", 4, 1),
        ("Katie", "Bev", 2, 2),
        ("Parker", "Travis", 4, 1),
        ("Sarah", "Clem", 2, 1),
        ("John", "Doe", 3, 2),
        ("Kat", "Veira", 7, 2),
        ("Lacy", "Greene", 4, 1),
        ("Kim", "Riley", 5, 2),
        ("Jarod", "Smith", 7, 1),
        ("Jarod", "Smith", 6, 1);




