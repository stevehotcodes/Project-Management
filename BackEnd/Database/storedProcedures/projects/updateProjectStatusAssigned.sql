CREATE OR ALTER PROCEDURE updateProjectStatusToAssigned(
    @id VARCHAR(255),
    @userID VARCHAR (255)
)
AS 
BEGIN
    UPDATE projects 
    SET projectStatus ='assigned' , userID=@userID, isAssigned=1
    WHERE id=@id AND projectStatus='unassigned'
END