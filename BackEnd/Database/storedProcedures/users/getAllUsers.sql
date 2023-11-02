CREATE OR ALTER PROCEDURE getAllUsers
AS
BEGIN

SELECT id, fullName, email FROM users WHERE role='employees'

END
