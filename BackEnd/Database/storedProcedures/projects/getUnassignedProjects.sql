CREATE OR ALTER PROCEDURE getUnassignedProjects
AS
BEGIN
SELECT * FROM  projects WHERE projectStatus ='unassigned';
END