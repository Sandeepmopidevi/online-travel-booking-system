# SQL Joins: Simple Explanation with Stayora Project Examples

## What is a JOIN in SQL?

A **JOIN** in SQL is used to combine rows from two or more tables based on a related column between them.  
It helps you get all the information you need from different tables in a single query.

---

## Types of Joins (with Stayora Examples)

### 1. **INNER JOIN**

- **Use:** Get rows that have matching values in both tables.
- **Example Use Case in Stayora:**  
  Show all bookings with the traveller’s name.

```sql
SELECT Bookings.BookingId, Users.Name, Hotels.Name AS HotelName
FROM Bookings
INNER JOIN Users ON Bookings.UserID = Users.UserID
INNER JOIN Hotels ON Bookings.HotelId = Hotels.HotelId;
```
*This will only show bookings that both have a user and a hotel.*

---

### 2. **LEFT JOIN** (or LEFT OUTER JOIN)

- **Use:** Get all rows from the left table (e.g., Hotels), and matched rows from the right table (e.g., Reviews). If there’s no match, you still get the left table data, and NULLs for the right table.
- **Example Use Case in Stayora:**  
  Show all hotels, even if they have no reviews yet.

```sql
SELECT Hotels.Name, Reviews.Rating
FROM Hotels
LEFT JOIN Reviews ON Hotels.HotelId = Reviews.HotelId;
```
*This will show every hotel, and if there are reviews, show the rating; otherwise, the rating will be NULL.*

---

### 3. **RIGHT JOIN** (or RIGHT OUTER JOIN)

- **Use:** Get all rows from the right table, even if there is no match in the left table.
- **Example Use Case in Stayora:**  
  Less common, but you might use it to show all reviews, even if the hotel record was deleted (not recommended in good design).

---

### 4. **FULL JOIN** (or FULL OUTER JOIN)

- **Use:** Get all rows when there is a match in either left or right table.
- **Example Use Case in Stayora:**  
  Show all hotels and all reviews, matched where possible.

```sql
SELECT Hotels.Name, Reviews.Rating
FROM Hotels
FULL OUTER JOIN Reviews ON Hotels.HotelId = Reviews.HotelId;
```

---

## Why Use Joins? (Beginner-Friendly Reasons)

- **Combine Data:** Bring together related info from different tables (e.g., show traveller name and hotel name for a booking).
- **Avoid Redundancy:** Keep your tables clean and organized, but still get all info in one query.
- **Answer Real Questions:** Like "Which user booked which hotel?", "Which hotels have no reviews?", "Which travellers have never booked?"—All these can be answered with JOINS.

---

## Use Cases in Stayora

1. **Show all bookings with user and hotel details.**  
   (INNER JOIN Bookings, Users, Hotels)
2. **List all hotels and their reviews, even if some hotels have no reviews.**  
   (LEFT JOIN Hotels, Reviews)
3. **Find all users who have never made a booking.**  
   (LEFT JOIN Users to Bookings and look for NULL bookings)
4. **Show all support tickets and which users raised them.**  
   (INNER JOIN SupportTickets, Users)

---

## Simple Example (Hotels and Reviews)

- **Tables:**  
  - Hotels (HotelId, Name)
  - Reviews (ReviewId, HotelId, Rating)

- **Question:** Show all hotels with their average review rating (if any).

```sql
SELECT Hotels.Name, AVG(Reviews.Rating) AS AverageRating
FROM Hotels
LEFT JOIN Reviews ON Hotels.HotelId = Reviews.HotelId
GROUP BY Hotels.Name;
```
*This shows every hotel, and if there are reviews, their average rating; if not, NULL.*

---

## Summary

**Joins** are powerful tools in SQL that let you answer practical business questions by combining data from different tables. In Stayora, they help you connect users, bookings, hotels, reviews, payments, and more!
