CREATE  TABLE users (
    id  VARCHAR (MAX)  PRIMARY KEY NOT NULL UNIQUE,
    fullname VARCHAR (MAX) NOT NULL ,
    email VARCHAR(MAX) NOT NULL UNIQUE,
    password VARCHAR (MAX) NOT NULL UNIQUE,
    role VARCHAR(MAX) NOT NULL DEFAULT 'users',
    dateRegistered DATETIME DEFAULT GETDATE()
)


--Create a database with following name --- CREATE DATABASE ProjectManagementDB---

--SELECT * FROM users--- to confirm whether the table exist
--DROP TABLE users---
