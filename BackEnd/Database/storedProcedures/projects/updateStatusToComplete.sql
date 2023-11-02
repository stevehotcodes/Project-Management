CREATE OR ALTER PROCEDURE updateProjectStatusToAssigned(
    @id VARCHAR(255),
)
AS 
BEGIN
    UPDATE projects 
    SET projectStatus ='completed' ,isAssigned=0
    WHERE id=@id AND projectStatus='in progress'
END