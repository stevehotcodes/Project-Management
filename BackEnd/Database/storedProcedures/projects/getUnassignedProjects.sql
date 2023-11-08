CREATE OR ALTER PROCEDURE getAllProjects
AS
BEGIN
    SELECT projects.*, users.fullname,users.id
    FROM projects
    LEFT JOIN users ON projects.userID = users.id;
    WHERE users.isAssigned=0
END