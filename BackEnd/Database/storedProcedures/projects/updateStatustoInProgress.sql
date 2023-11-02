CREATE OR ALTER PROCEDURE updateProjectStatusToInProgress(
    @id VARCHAR(255),
)
AS 
BEGIN
    UPDATE projects 
    SET projectStatus ='assigned'
    WHERE id=@id AND  projectStatus='in progress'
END