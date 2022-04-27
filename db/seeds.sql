

INSERT INTO department (name)
VALUES
    ('HR'),
    ('Sales'),
    ('Accounts Payables'),
    ('Accounts Receivables'),
    ('Warehouse');

INSERT INTO role (title, salary, department_id)
VALUES
    ('HR Team Lead', 120000, 1),
    ('HR Team', 80000, 1),
    ('Sales Lead', 150000, 2),
    ('Salesperson', 95000, 2),
    ('Accounts Payables', 65000, 3),
    ('Accounts Receivables', 65000, 4),
    ('Warehouse', 40000, 5);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
        ('Karly', 'Weatherstein', 1, 3),
        ('Diane', 'Smith', 2, null),
        ('Katie', 'Bev', 3, 1),
        ('Parker', 'Travis', 4, null),
        ('Sarah', 'Clem', 5, null),
        ('John', 'Doe', 6, 2),
        ('Kat', 'Veira', 7, 5),
        ('Lacy', 'Greene', 8, null),
        ('Kim', 'Riley', 9, 4),
        ('Jarod', 'Smith', 10, null);



