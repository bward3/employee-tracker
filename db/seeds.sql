INSERT INTO departments (id, dept_name)
VALUES (1, "Engineering"),
    (2, "Finance"),
    (3, "Sales"),
    (4, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Sales Lead", 90000, 3),
    (2, "Salesperson", 70000, 3),
    (3, "Lead Engineer", 120000, 1),
    (4, "Software Engineer", 10000, 1),
    (5, "Account Manager", 300000, 2),
    (6, "Accountant", 120000, 2),
    (7, "Legal Team Lead", 250000, 4),
    (8, "Lawyer", 100000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "George", "Clooney", 1, null),
    (2, "Matt", "Damon", 2, 1),
    (3, "Brad", "Pitt", 3, null),
    (4, "Julia", "Roberts", 4, 3),
    (5, "Bernie", "Mac", 5, null),
    (6, "Elliott", "Gould", 6, 5),
    (7, "Casey", "Affleck", 7, null),
    (8, "Carl", "Reiner", 8, 7);