INSERT INTO departments (dept_name)
VALUES ("Engineering"),
    ("Finance"),
    ("Sales"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 90000, 3),
    ("Salesperson", 70000, 3),
    ("Lead Engineer", 120000, 1),
    ("Software Engineer", 10000, 1),
    ("Account Manager", 300000, 2),
    ("Accountant", 120000, 2),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("George", "Clooney", 1, null),
    ("Matt", "Damon", 2, 1),
    ("Brad", "Pitt", 3, null),
    ("Julia", "Roberts", 4, 3),
    ("Bernie", "Mac", 5, null),
    ("Elliott", "Gould", 6, 5),
    ("Casey", "Affleck", 7, null),
    ("Carl", "Reiner", 8, 7);