
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
        ("Diane", "Smith", 4, null),
        ("Katie", "Bev", 2, 2),
        ("Parker", "Travis", 4, null),
        ("Sarah", "Clem", 2, null),
        ("John", "Doe", 3, 2),
        ("Kat", "Veira", 7, 2),
        ("Lacy", "Greene", 4, null),
        ("Kim", "Riley", 5, 2),
        ("Jarod", "Smith", 7, null),
        ("Jarod", "Smith", 6, null);




