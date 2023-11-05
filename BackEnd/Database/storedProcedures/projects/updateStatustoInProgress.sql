CREATE OR ALTER PROCEDURE updateProjectStatusToInProgress(
    @id VARCHAR(255)
)
AS 
BEGIN
    UPDATE projects 
    SET projectStatus ='in progress'
    WHERE id=@id AND  projectStatus='assigned'
END



CREATE OR ALTER PROCEDURE updateProjectStatusToComplete(
	@id VARCHAR (255),

)
AS
BEGIN

	 BEGIN TRANSACTION
	 
	 -- Update the Projects table
    UPDATE projects
    SET projectStatus = 'completed'
    WHERE id = @id AND projectStatus = 'in porgress';

    -- Update the Users table
    UPDATE Users
    SET isAssigned = 0
    WHERE isAssigned = 1 AND id=@userID

    -- Commit the transaction
    COMMIT

END
