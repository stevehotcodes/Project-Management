CREATE OR ALTER PROCEDURE getUserEmail(
    @email VARCHAR (255),
    @password VARCHAR (255)
)
AS
BEGIN
    SELECT * FROM users WHERE email=@email 
END