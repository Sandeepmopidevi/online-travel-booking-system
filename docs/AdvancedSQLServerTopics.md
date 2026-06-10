# Advanced SQL Server Topics - Simple Explanations with Project Examples

Beginner-friendly explanations and project-style examples for SQL Server interview prep.

---

## 1. Getting Started

### Introduction to SQL Server
SQL Server is Microsoft’s database system used to store and manage data for applications.

### SQL Server Editions
Editions include Express (free), Standard, and Enterprise (full features).

### Key Components and Services
- **Database Engine**: Stores and processes data.
- **SQL Server Agent**: Schedules jobs (like automatic backups).
- **SSMS (SQL Server Management Studio)**: A tool to manage SQL Server visually.

### SQL Server Instances
Multiple separate installations (“instances”) of SQL Server can run on one machine, each with its own databases.

### SQL Server Management Studio (SSMS)
SSMS is a graphical tool to write queries, manage databases, and view results.

---

## 2. Advanced Concepts

### Window Functions
- **OVER()**: Used to perform calculations across a set of rows.
- **PARTITION BY**: Divides result set into groups for window functions.
- **ROW_NUMBER()**: Gives a unique row number to each row within a partition.
- **RANK()**: Gives ranking, with gaps for ties.
- **DENSE_RANK()**: Like RANK but no gaps.

#### Example
```sql
SELECT Name, Salary, 
       ROW_NUMBER() OVER(PARTITION BY Department ORDER BY Salary DESC) AS RowNum
FROM Employees
```

### GROUPING SETS, CUBE, ROLLUP
- **GROUPING SETS**: Custom groupings in one query.
- **CUBE**: All combinations of groupings.
- **ROLLUP**: Hierarchical groupings.

### WITH Statement & CTE
- **CTE (Common Table Expression)**: Temporary result set for queries.
- **Recursive CTE**: Calls itself to process hierarchical data.

#### Example
```sql
WITH DeptCTE AS (
  SELECT DeptID, Name FROM Departments WHERE ParentDept IS NULL
  UNION ALL
  SELECT d.DeptID, d.Name FROM Departments d
  INNER JOIN DeptCTE c ON d.ParentDept = c.DeptID
)
SELECT * FROM DeptCTE
```

### MERGE
Merges data from one table to another (insert, update, delete as needed).

### PIVOT / UNPIVOT
- **PIVOT**: Turns rows into columns.
- **UNPIVOT**: Turns columns into rows.

---

## 3. Views and Indexes

### Views
- **View**: A saved SQL query, acts like a virtual table.
- **Creating/Modifying/Dropping**: Use `CREATE VIEW`, `ALTER VIEW`, `DROP VIEW`.
- **Types**: Simple, Complex, Indexed.
- **Updating**: Some views can be updated if based on a single table.
- **Security**: Restrict access to data via views.

#### Example
```sql
CREATE VIEW vw_EmployeeSalaries AS
SELECT Name, Salary FROM Employees
```

### Indexes
- **Index**: Speeds up searches on tables.
- **Types**: Clustered (sorts table), Non-clustered (separate structure), Unique, Full-Text.
- **Creating/Modifying/Dropping**: Use `CREATE INDEX`, `ALTER INDEX`, `DROP INDEX`.
- **Covering Index**: Includes all columns needed for a query.
- **Fragmentation**: Over time, indexes become less efficient.
- **Optimization**: Rebuild or reorganize indexes for performance.

---

## 4. Stored Procedures and User-Defined Functions

### Stored Procedures
- **Stored Procedure**: Predefined set of SQL statements.
- **Benefits**: Reuse, security, performance.
- **Types**: User-defined, Temporary, System, Extended User-Defined.
- **Permissions**: Control who can execute.
- **Parameters**: Accept input/output.

#### Example
```sql
CREATE PROCEDURE GetEmployeeByID @EmpID INT
AS
SELECT * FROM Employees WHERE EmployeeID = @EmpID
```

### Functions
- **Function**: Returns a value/table, used in queries.
- **Types**: Scalar (single value), Table-valued (table), System (built-in).
- **Benefits**: Reuse, modularity.

#### Example
```sql
CREATE FUNCTION GetDeptName(@DeptID INT)
RETURNS VARCHAR(100)
AS
BEGIN
  RETURN (SELECT Name FROM Departments WHERE DeptID = @DeptID)
END
```

---

## 5. Triggers and Cursors

### Triggers
- **Trigger**: Automatic action on table change (Insert/Update/Delete).
- **Types**: AFTER, INSTEAD OF, Logon.
- **Advantages**: Enforce rules, audit changes.
- **Disadvantages**: Hard to debug, can impact performance.

#### Example
```sql
CREATE TRIGGER trg_AfterInsert
ON Employees
AFTER INSERT
AS
BEGIN
  INSERT INTO AuditLog (ChangeType, ChangeDate) VALUES ('Insert', GETDATE())
END
```

### Cursors
- **Cursor**: Processes rows one at a time.
- **Life Cycle**: Declare, Open, Fetch, Close, Deallocate.
- **Types**: Static, Dynamic, Forward-only, Keyset.
- **Limitations**: Slow, use set-based operations if possible.

#### Example
```sql
DECLARE employee_cursor CURSOR FOR SELECT Name FROM Employees
OPEN employee_cursor
FETCH NEXT FROM employee_cursor INTO @name
-- Process rows here
CLOSE employee_cursor
DEALLOCATE employee_cursor
```

---

## 6. Exception Handling

### Exceptions
- **System Defined**: SQL errors (e.g., division by zero).
- **User Defined**: Custom errors with THROW/RAISERROR.
- **TRY/CATCH**: Handle errors in SQL.

#### Example
```sql
BEGIN TRY
  -- Code that may fail
  SELECT 1/0
END TRY
BEGIN CATCH
  SELECT ERROR_MESSAGE()
END CATCH
```

---

## 7. Transactions

### Transactions
- **Transaction**: Group of SQL operations that succeed or fail together.
- **ACID**: Atomicity, Consistency, Isolation, Durability.
- **Statements**: BEGIN, COMMIT, ROLLBACK.
- **Savepoints**: Partial rollbacks.
- **Implicit/Explicit**: SQL Server can auto-start transactions, or you control them.
- **Isolation Levels**: Control how/when changes are visible.
- **Locking/Blocking/Deadlocks**: Manage concurrent access.

#### Example
```sql
BEGIN TRAN
  UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1
  UPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 2
COMMIT TRAN
```

---

# Summary Tables

## Getting Started

| Topic             | One-line Definition                                           |
|-------------------|--------------------------------------------------------------|
| SQL Server        | Microsoft's relational database system.                      |
| Editions          | Versions: Express (free), Standard, Enterprise (full).       |
| Services          | Components like Engine, Agent, and SSMS.                     |
| Instances         | Separate SQL Server installations on one machine.            |
| SSMS              | Tool for managing SQL Server databases.                      |

## Advanced Concepts

| Topic           | One-line Definition                                            |
|-----------------|---------------------------------------------------------------|
| OVER()          | Applies a function to a window of rows.                       |
| PARTITION BY    | Divides result set into groups for window functions.          |
| ROW_NUMBER()    | Unique row number within a partition.                         |
| RANK/DENSE_RANK | Rankings within partitions; DENSE_RANK has no gaps.           |
| GROUPING SETS   | Multiple groupings in one query.                              |
| CUBE/ROLLUP     | All/hierarchical groupings.                                   |
| CTE             | Named temporary result set in a query.                        |
| Recursive CTE   | CTE that calls itself, for hierarchies.                       |
| MERGE           | Insert/update/delete in one statement.                        |
| PIVOT/UNPIVOT   | Turn rows into columns/columns into rows.                     |

## Views and Indexes

| Topic           | One-line Definition                                            |
|-----------------|---------------------------------------------------------------|
| View            | Saved SQL query acting as a virtual table.                    |
| Indexed View    | View with a physical index for faster access.                 |
| Index           | Structure to speed up data retrieval.                         |
| Covering Index  | Index with all columns needed for a query.                    |
| Fragmentation   | Inefficiency in index storage over time.                      |

## Stored Procedures & Functions

| Topic             | One-line Definition                                         |
|-------------------|------------------------------------------------------------|
| Stored Procedure  | Predefined set of SQL statements for reuse.                |
| Parameters        | Inputs to stored procedures/functions.                      |
| Function          | Returns a value or table, used in queries.                 |
| Scalar Function   | Returns a single value.                                    |
| Table-valued Func.| Returns a table.                                           |

## Triggers and Cursors

| Topic           | One-line Definition                                          |
|-----------------|-------------------------------------------------------------|
| Trigger         | Automatic action on table change.                           |
| AFTER Trigger   | Runs after insert/update/delete.                            |
| INSTEAD OF      | Replaces the original action.                               |
| Cursor          | Processes rows one at a time.                               |

## Exception Handling

| Topic           | One-line Definition                                          |
|-----------------|-------------------------------------------------------------|
| Exception       | Error during SQL execution.                                 |
| TRY/CATCH       | Handle errors in SQL Server.                                |
| THROW/RAISERROR | Raise custom exceptions.                                    |

## Transactions

| Topic           | One-line Definition                                            |
|-----------------|---------------------------------------------------------------|
| Transaction     | Group of operations that succeed/fail together.               |
| ACID            | Properties for reliable transactions.                         |
| Savepoint       | Mark within a transaction for partial rollback.               |
| Isolation Level | Controls visibility/locking between transactions.             |
| Deadlock        | Two transactions block each other.                            |

---