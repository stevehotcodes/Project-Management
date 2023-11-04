CREATE OR ALTER PROCEDURE getUnAssignedUsers
AS
BEGIN

    SELECT id, fullname, email FROM users WHERE role='employees' AND isAssigned=0


END
