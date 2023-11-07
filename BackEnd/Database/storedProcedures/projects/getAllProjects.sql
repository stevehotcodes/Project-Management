CREATE OR ALTER PROCEDURE getAllProjects
AS
BEGIN
    SELECT projects.*, users.fullname
    FROM projects
    LEFT JOIN users ON projects.userID = users.id;
END