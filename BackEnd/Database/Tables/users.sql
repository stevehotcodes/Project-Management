CREATE  TABLE users (
    id  VARCHAR (255)  PRIMARY KEY NOT NULL,
    fullname VARCHAR (255) NOT NULL ,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR (255) NOT NULL ,
    role VARCHAR(255) NOT NULL DEFAULT 'employees',
    dateRegistered DATETIME DEFAULT GETDATE(),
    isAssigned INT DEFAULT 0
)


--Create a database with following name --- CREATE DATABASE ProjectManagementDB---

--SELECT * FROM users--- to confirm whether the table exist
--DROP TABLE users---
