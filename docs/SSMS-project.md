# Top 100 SSMS (SQL Server Management Studio) and SQL Interview Questions with Answers

This document covers the most common SQL and SSMS interview questions, with simple answers and examples related to the Stayora: Online Travel and Hospitality Booking System project.

---

### 1. What is SQL?
**Answer:**  
SQL (Structured Query Language) is a language used to manage and manipulate relational databases.  
**Project Example:**  
Used for storing and retrieving hotel, flight, booking, and user data in Stayora.

---

### 2. What is SSMS?
**Answer:**  
SSMS (SQL Server Management Studio) is a tool from Microsoft for managing SQL Server databases.  
**Project Example:**  
Used to view, edit, back up, and query the Stayora database.

---

### 3. What is a table in SQL?
**Answer:**  
A table is a collection of rows and columns for storing data.  
**Project Example:**  
`Users`, `Hotels`, `Bookings`, `Flights` are all tables in Stayora.

---

### 4. How do you create a table?
**Answer:**  
```sql
CREATE TABLE Hotels (
    HotelId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    City NVARCHAR(50)
);
```
**Project Example:**  
Used to create the `Hotels` table for storing hotel information.

---

### 5. What is a primary key?
**Answer:**  
A primary key uniquely identifies each row in a table.  
**Project Example:**  
`HotelId` in the `Hotels` table.

---

### 6. What is a foreign key?
**Answer:**  
A foreign key links two tables together.  
**Project Example:**  
`UserID` in the `Bookings` table links to `Users`.

---

### 7. How do you insert data into a table?
**Answer:**  
```sql
INSERT INTO Hotels (Name, City) VALUES ('Hotel Paradise', 'Goa');
```
**Project Example:**  
Add a new hotel to Stayora.

---

### 8. How do you update data in a table?
**Answer:**  
```sql
UPDATE Hotels SET City = 'Mumbai' WHERE HotelId = 1;
```
**Project Example:**  
Change a hotel’s city.

---

### 9. How do you delete data from a table?
**Answer:**  
```sql
DELETE FROM Hotels WHERE HotelId = 1;
```
**Project Example:**  
Remove a hotel that is no longer listed.

---

### 10. How do you select all data from a table?
**Answer:**  
```sql
SELECT * FROM Hotels;
```
**Project Example:**  
Show all hotels to a traveller.

---

### 11. What is a JOIN? Name types.
**Answer:**  
A JOIN combines rows from two or more tables.  
Types: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN.  
**Project Example:**  
Get bookings with user details.

---

### 12. Show an INNER JOIN example.
**Answer:**  
```sql
SELECT Bookings.BookingId, Users.Name
FROM Bookings
INNER JOIN Users ON Bookings.UserID = Users.UserID;
```
**Project Example:**  
List all bookings with who booked them.

---

### 13. What is a LEFT JOIN?
**Answer:**  
Returns all records from the left table and matched records from the right table.
**Project Example:**  
Show all hotels, even if they have no reviews.

---

### 14. How do you sort data in SQL?
**Answer:**  
```sql
SELECT * FROM Hotels ORDER BY Name ASC;
```
**Project Example:**  
Sort hotels alphabetically.

---

### 15. How do you filter data in SQL?
**Answer:**  
```sql
SELECT * FROM Hotels WHERE City = 'Goa';
```
**Project Example:**  
Find all hotels in Goa.

---

### 16. What is an aggregate function?
**Answer:**  
Functions like COUNT, SUM, AVG, MIN, MAX that summarize data.
**Project Example:**  
Count total bookings.

---

### 17. Example: Count bookings for a hotel.
**Answer:**  
```sql
SELECT COUNT(*) FROM Bookings WHERE HotelId = 1;
```
**Project Example:**  
Shows bookings for a specific hotel.

---

### 18. How do you find the average rating for a hotel?
**Answer:**  
```sql
SELECT AVG(Rating) FROM Reviews WHERE HotelId = 1;
```
**Project Example:**  
Show average review score for a hotel.

---

### 19. What is a stored procedure?
**Answer:**  
A saved collection of SQL statements that can be reused.
**Project Example:**  
A stored procedure for adding a new booking.

---

### 20. How do you call a stored procedure?
**Answer:**  
```sql
EXEC AddBooking @UserID = 1, @HotelId = 2, @Date = '2025-06-07';
```
**Project Example:**  
Book a hotel using a stored procedure.

---

### 21. What is a view?
**Answer:**  
A virtual table based on a query.
**Project Example:**  
A view to show all invoices with user and booking info.

---

### 22. How do you create a view?
**Answer:**  
```sql
CREATE VIEW HotelBookings AS
SELECT Hotels.Name, Bookings.BookingDate
FROM Hotels
JOIN Bookings ON Hotels.HotelId = Bookings.HotelId;
```
**Project Example:**  
Quickly see bookings for each hotel.

---

### 23. How do you create an index?
**Answer:**  
```sql
CREATE INDEX idx_city ON Hotels (City);
```
**Project Example:**  
Speeds up searches by city.

---

### 24. What is normalization?
**Answer:**  
Organizing data to reduce redundancy.
**Project Example:**  
Hotels, Users, Bookings are in separate tables.

---

### 25. What is denormalization?
**Answer:**  
Combining tables for faster reads at the cost of redundancy.

---

### 26. How do you backup a database in SSMS?
**Answer:**  
Right-click database > Tasks > Back Up.

---

### 27. How do you restore a database in SSMS?
**Answer:**  
Right-click Databases > Restore Database.

---

### 28. How do you run a query in SSMS?
**Answer:**  
Click "New Query", type SQL, press F5 or click "Execute".

---

### 29. How do you check for NULL values?
**Answer:**  
```sql
SELECT * FROM Hotels WHERE City IS NULL;
```
**Project Example:**  
Find hotels without a city set.

---

### 30. What does GROUP BY do?
**Answer:**  
Groups rows that have the same values.
**Project Example:**  
Group bookings by hotel.

---

### 31. Example: Bookings per hotel.
**Answer:**  
```sql
SELECT HotelId, COUNT(*) AS TotalBookings
FROM Bookings
GROUP BY HotelId;
```

---

### 32. What is a transaction?
**Answer:**  
A set of SQL operations that run together.  
**Project Example:**  
Booking and payment should both succeed or both fail.

---

### 33. How do you start a transaction?
**Answer:**  
```sql
BEGIN TRANSACTION;
-- SQL code
COMMIT;
```

---

### 34. How do you roll back a transaction?
**Answer:**  
```sql
ROLLBACK;
```

---

### 35. What is a constraint?
**Answer:**  
A rule for data in a table (e.g., NOT NULL, UNIQUE, FOREIGN KEY).

---

### 36. How do you add a NOT NULL constraint?
**Answer:**  
```sql
ALTER TABLE Hotels ALTER COLUMN Name NVARCHAR(100) NOT NULL;
```

---

### 37. How do you make a column unique?
**Answer:**  
```sql
ALTER TABLE Hotels ADD CONSTRAINT UQ_Hotel_Name UNIQUE (Name);
```

---

### 38. How do you get the top N rows?
**Answer:**  
```sql
SELECT TOP 5 * FROM Hotels;
```
**Project Example:**  
Show top 5 hotels.

---

### 39. What is the difference between DELETE and TRUNCATE?
**Answer:**  
DELETE removes rows one by one (can filter), TRUNCATE removes all rows quickly and resets identity.

---

### 40. How do you join three tables?
**Answer:**  
```sql
SELECT * FROM Bookings
JOIN Users ON Bookings.UserID = Users.UserID
JOIN Hotels ON Bookings.HotelId = Hotels.HotelId;
```
**Project Example:**  
Show bookings with user and hotel info.

---

### 41. What is a subquery?
**Answer:**  
A query inside another query.
**Project Example:**  
Find users who booked more than 3 times.

---

### 42. Show a subquery example.
**Answer:**  
```sql
SELECT * FROM Users WHERE UserID IN
(SELECT UserID FROM Bookings GROUP BY UserID HAVING COUNT(*) > 3);
```

---

### 43. What is a trigger?
**Answer:**  
A special procedure that runs automatically when data changes.

---

### 44. Example: Trigger after insert.
**Answer:**  
```sql
CREATE TRIGGER trg_AfterBookingInsert
ON Bookings
AFTER INSERT
AS
BEGIN
    PRINT 'Booking added!';
END;
```

---

### 45. What is a schema?
**Answer:**  
A way to group tables (like a folder).

---

### 46. How do you change a table’s schema?
**Answer:**  
```sql
ALTER SCHEMA newSchema TRANSFER dbo.Hotels;
```

---

### 47. How do you get current date in SQL?
**Answer:**  
```sql
SELECT GETDATE();
```

---

### 48. How do you find duplicate rows?
**Answer:**  
```sql
SELECT Name, COUNT(*) FROM Hotels GROUP BY Name HAVING COUNT(*) > 1;
```

---

### 49. How do you limit results (pagination)?
**Answer:**  
```sql
SELECT * FROM Hotels ORDER BY Name OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
```

---

### 50. What is the difference between CHAR and VARCHAR?
**Answer:**  
CHAR is fixed length, VARCHAR is variable length.  
**Project Example:**  
Use VARCHAR for hotel names.

---

### 51. How do you change a column’s data type?
**Answer:**  
```sql
ALTER TABLE Hotels ALTER COLUMN Name NVARCHAR(200);
```

---

### 52. What is a default value?
**Answer:**  
A value automatically given if none is specified.
**Project Example:**  
Default booking status to 'Pending'.

---

### 53. How to set a default value?
**Answer:**  
```sql
ALTER TABLE Bookings ADD CONSTRAINT DF_Status DEFAULT 'Pending' FOR Status;
```

---

### 54. How do you rename a table?
**Answer:**  
```sql
EXEC sp_rename 'Hotels', 'HotelList';
```

---

### 55. How do you rename a column?
**Answer:**  
```sql
EXEC sp_rename 'Hotels.Name', 'HotelName', 'COLUMN';
```

---

### 56. What is a composite key?
**Answer:**  
A primary key made from two or more columns.

---

### 57. How do you add a composite key?
**Answer:**  
```sql
ALTER TABLE ExampleTable ADD CONSTRAINT PK_Example PRIMARY KEY (Col1, Col2);
```

---

### 58. How do you drop a table?
**Answer:**  
```sql
DROP TABLE Hotels;
```

---

### 59. How do you drop a column?
**Answer:**  
```sql
ALTER TABLE Hotels DROP COLUMN City;
```

---

### 60. How do you check all tables in a database?
**Answer:**  
```sql
SELECT * FROM INFORMATION_SCHEMA.TABLES;
```

---

### 61. How do you get column info for a table?
**Answer:**  
```sql
EXEC sp_columns Hotels;
```

---

### 62. How do you get all users in SQL Server?
**Answer:**  
```sql
SELECT * FROM sys.sysusers;
```

---

### 63. How do you get a list of all databases?
**Answer:**  
```sql
SELECT name FROM sys.databases;
```

---

### 64. What is a clustered index?
**Answer:**  
An index that determines the physical order of data in a table.  
**Project Example:**  
Primary key is a clustered index by default.

---

### 65. What is a non-clustered index?
**Answer:**  
An index that does not affect row order.  
**Project Example:**  
Add for searching hotels by city.

---

### 66. How to drop an index?
**Answer:**  
```sql
DROP INDEX idx_city ON Hotels;
```

---

### 67. What is a unique constraint?
**Answer:**  
Ensures all values in a column are different.

---

### 68. What is a NULL value?
**Answer:**  
A missing or unknown value.

---

### 69. How do you handle NULL in queries?
**Answer:**  
```sql
SELECT ISNULL(City, 'Unknown') FROM Hotels;
```

---

### 70. How do you use CASE in SQL?
**Answer:**  
```sql
SELECT Name,
CASE
  WHEN City = 'Goa' THEN 'Beach'
  ELSE 'Other'
END AS LocationType
FROM Hotels;
```

---

### 71. How do you concatenate strings?
**Answer:**  
```sql
SELECT Name + ', ' + City FROM Hotels;
```

---

### 72. What is a scalar function?
**Answer:**  
A function that returns a single value.

---

### 73. How do you create a scalar function?
**Answer:**  
```sql
CREATE FUNCTION GetHotelName(@HotelId INT)
RETURNS NVARCHAR(100)
AS
BEGIN
  RETURN (SELECT Name FROM Hotels WHERE HotelId = @HotelId);
END;
```

---

### 74. How do you call a function?
**Answer:**  
```sql
SELECT dbo.GetHotelName(1);
```

---

### 75. What is a table-valued function?
**Answer:**  
A function that returns a table.

---

### 76. How do you create a table-valued function?
**Answer:**  
```sql
CREATE FUNCTION GetHotelsByCity(@City NVARCHAR(50))
RETURNS TABLE
AS
RETURN (SELECT * FROM Hotels WHERE City = @City);
```

---

### 77. What is the use of TOP?
**Answer:**  
Limits the number of rows returned.

---

### 78. How do you check for existence?
**Answer:**  
```sql
IF EXISTS(SELECT 1 FROM Hotels WHERE Name = 'Hotel Paradise')
  PRINT 'Exists';
```

---

### 79. What does DISTINCT do?
**Answer:**  
Returns unique values.

---

### 80. Example: Get all unique cities.
**Answer:**  
```sql
SELECT DISTINCT City FROM Hotels;
```

---

### 81. How do you use LIKE for pattern matching?
**Answer:**  
```sql
SELECT * FROM Hotels WHERE Name LIKE '%Beach%';
```

---

### 82. How do you comment in SQL?
**Answer:**  
-- Single line  
/* Multi-line */

---

### 83. How do you add a new column?
**Answer:**  
```sql
ALTER TABLE Hotels ADD Description NVARCHAR(200);
```

---

### 84. How do you get the maximum value?
**Answer:**  
```sql
SELECT MAX(Amount) FROM Payments;
```

---

### 85. How do you get the minimum value?
**Answer:**  
```sql
SELECT MIN(Amount) FROM Payments;
```

---

### 86. How do you convert data types?
**Answer:**  
```sql
SELECT CAST(Amount AS INT) FROM Payments;
```

---

### 87. What is an identity column?
**Answer:**  
A column that auto-increments.

---

### 88. How do you create an identity column?
**Answer:**  
```sql
CREATE TABLE Example (Id INT IDENTITY(1,1) PRIMARY KEY);
```

---

### 89. How do you reset identity seed?
**Answer:**  
```sql
DBCC CHECKIDENT ('Hotels', RESEED, 0);
```

---

### 90. How do you drop a constraint?
**Answer:**  
```sql
ALTER TABLE Hotels DROP CONSTRAINT UQ_Hotel_Name;
```

---

### 91. What is the difference between WHERE and HAVING?
**Answer:**  
WHERE filters rows before grouping, HAVING after grouping.

---

### 92. Example using HAVING.
**Answer:**  
```sql
SELECT HotelId, COUNT(*) FROM Bookings
GROUP BY HotelId
HAVING COUNT(*) > 5;
```

---

### 93. How do you check SQL Server version?
**Answer:**  
```sql
SELECT @@VERSION;
```

---

### 94. How do you schedule a job in SSMS?
**Answer:**  
Use SQL Server Agent > Jobs.

---

### 95. How do you export query results?
**Answer:**  
Right-click results > Save Results As > CSV.

---

### 96. What is a deadlock?
**Answer:**  
When two transactions block each other; both can’t finish.

---

### 97. How do you see execution plan in SSMS?
**Answer:**  
Click “Display Estimated Execution Plan” (Ctrl+M before running query).

---

### 98. How do you check database size?
**Answer:**  
```sql
sp_spaceused;
```

---

### 99. How do you kill a process in SSMS?
**Answer:**  
```sql
KILL <process_id>;
```

---

### 100. How do you give a user permissions?
**Answer:**  
```sql
GRANT SELECT, INSERT ON Hotels TO [username];
```
**Project Example:**  
Give a new hotel manager permission to add hotels.

---
