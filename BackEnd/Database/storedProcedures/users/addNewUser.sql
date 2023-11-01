CREATE OR ALTER PROCEDURE addUser(
@id  VARCHAR (255) ,
@fullname VARCHAR (255),
@email VARCHAR(255) ,
@password VARCHAR (255),
)
AS
BEGIN

INSERT INTO users (id, fullname, email, password)
VALUES (@id, @fullname, @email, @password)
END
