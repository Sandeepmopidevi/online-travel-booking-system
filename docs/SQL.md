# 🧠 Top 50 SQL Interview Questions and Answers

## 📘 Basics

### 1. **What is SQL?**

Structured Query Language (SQL) is used to communicate with relational databases. It is used for storing, manipulating, and retrieving data.

### 2. **What are the different types of SQL commands?**

* **DDL**: Data Definition Language (CREATE, ALTER, DROP)
* **DML**: Data Manipulation Language (INSERT, UPDATE, DELETE)
* **DCL**: Data Control Language (GRANT, REVOKE)
* **TCL**: Transaction Control Language (COMMIT, ROLLBACK)
* **DQL**: Data Query Language (SELECT)

### 3. **What is a primary key?**

A column or a group of columns that uniquely identifies each row in a table.

### 4. **What is a foreign key?**

A key used to link two tables together. It refers to the primary key in another table.

### 5. **What is the difference between WHERE and HAVING?**

* **WHERE**: Filters rows before grouping
* **HAVING**: Filters groups after GROUP BY

---

## 🔍 Querying & Filtering

### 6. **How do you select all columns from a table?**

```sql
SELECT * FROM table_name;
```

### 7. **How to get unique values from a column?**

```sql
SELECT DISTINCT column_name FROM table_name;
```

### 8. **How do you use BETWEEN in SQL?**

```sql
SELECT * FROM table_name WHERE column_name BETWEEN value1 AND value2;
```

### 9. **What is the LIKE operator?**

Used for pattern matching using `%` and `_`.

```sql
SELECT * FROM users WHERE name LIKE 'A%';
```

### 10. **What is IN in SQL?**

```sql
SELECT * FROM users WHERE city IN ('Delhi', 'Mumbai');
```

---

## 🧮 Aggregations & Grouping

### 11. **List some aggregate functions.**

* COUNT()
* SUM()
* AVG()
* MAX()
* MIN()

### 12. **How do you group data?**

```sql
SELECT department, COUNT(*) FROM employees GROUP BY department;
```

### 13. **How to filter grouped results?**

```sql
SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5;
```

---

## 🔗 Joins

### 14. **What is a JOIN?**

A JOIN combines rows from two or more tables based on a related column.

### 15. **Types of Joins?**

* INNER JOIN
* LEFT JOIN
* RIGHT JOIN
* FULL OUTER JOIN

### 16. **Example of INNER JOIN**

```sql
SELECT e.name, d.name FROM employees e INNER JOIN departments d ON e.dept_id = d.id;
```

### 17. **LEFT JOIN example**

```sql
SELECT e.name, d.name FROM employees e LEFT JOIN departments d ON e.dept_id = d.id;
```

---

## ✏️ Data Manipulation

### 18. **How to insert data?**

```sql
INSERT INTO users (name, age) VALUES ('John', 30);
```

### 19. **How to update data?**

```sql
UPDATE users SET age = 31 WHERE name = 'John';
```

### 20. **How to delete data?**

```sql
DELETE FROM users WHERE name = 'John';
```

---

## ⚙️ Constraints & Keys

### 21. **What is a UNIQUE constraint?**

Ensures all values in a column are different.

### 22. **What is NOT NULL?**

Ensures a column cannot have NULL values.

### 23. **What is CHECK constraint?**

Restricts values in a column.

```sql
CHECK (age >= 18)
```

### 24. **What is DEFAULT constraint?**

Sets a default value for a column if no value is specified.

---

## 🧱 Table Management

### 25. **How to create a table?**

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  age INT
);
```

### 26. **How to alter a table?**

```sql
ALTER TABLE users ADD email VARCHAR(100);
```

### 27. **How to drop a table?**

```sql
DROP TABLE users;
```

### 28. **Rename a table?**

```sql
ALTER TABLE old_name RENAME TO new_name;
```

---

## 🌀 Views

### 29. **What is a View?**

A virtual table based on the result-set of a query.

### 30. **Create a View**

```sql
CREATE VIEW user_view AS SELECT name, age FROM users;
```

### 31. **Drop a View**

```sql
DROP VIEW user_view;
```

---

## 🔐 Indexes & Transactions

### 32. **What is an Index?**

Improves the speed of data retrieval.

```sql
CREATE INDEX idx_name ON users(name);
```

### 33. **What is a Transaction?**

A sequence of operations performed as a single logical unit of work.

### 34. **COMMIT vs ROLLBACK**

* **COMMIT**: Saves changes
* **ROLLBACK**: Undoes changes

---

## 🔁 Triggers

### 35. **What is a Trigger?**

A block of SQL that is executed automatically in response to certain events on a table.

### 36. **Example Trigger**

```sql
CREATE TRIGGER before_insert_users
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  SET NEW.created_at = NOW();
END;
```

### 37. **Drop a Trigger**

```sql
DROP TRIGGER trigger_name;
```

---

## 🧪 Stored Procedures

### 38. **What is a Stored Procedure?**

A prepared SQL code that you can save and reuse.

### 39. **Create Procedure**

```sql
CREATE PROCEDURE GetUsers()
BEGIN
  SELECT * FROM users;
END;
```

### 40. **Call Procedure**

```sql
CALL GetUsers();
```

---

## 🔃 Cursors

### 41. **What is a Cursor?**

Used to fetch data row by row from a result set.

### 42. **Basic Cursor Example**

```sql
DECLARE cur CURSOR FOR SELECT name FROM users;
OPEN cur;
FETCH cur INTO @name;
CLOSE cur;
```

---

## 🧠 Advanced Topics

### 43. **What is normalization?**

Process of organizing data to reduce redundancy.

### 44. **What are the normal forms?**

1NF, 2NF, 3NF, BCNF, etc.

### 45. **What is denormalization?**

Opposite of normalization. Used for performance improvement.

### 46. **What is a subquery?**

A query nested inside another query.

### 47. **What is a correlated subquery?**

A subquery that uses values from the outer query.

### 48. **What is a Common Table Expression (CTE)?**

A temporary result set used in a `WITH` clause.

```sql
WITH dept_count AS (
  SELECT dept_id, COUNT(*) as emp_count FROM employees GROUP BY dept_id
)
SELECT * FROM dept_count;
```

### 49. **What is the difference between DELETE and TRUNCATE?**

* DELETE: Can be rolled back, row-by-row.
* TRUNCATE: Faster, cannot be rolled back.

### 50. **What is ACID in SQL?**

* **Atomicity**: All or nothing
* **Consistency**: Valid state
* **Isolation**: Transactions don’t interfere
* **Durability**: Persisted even on crash
