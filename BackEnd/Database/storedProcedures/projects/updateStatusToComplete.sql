
CREATE OR ALTER PROCEDURE updateProjectStatusToComplete(
	@id VARCHAR (255),
	@userID VARCHAR(255)
)
AS

BEGIN

	 BEGIN TRANSACTION
	 
	 -- Update the Projects table
    UPDATE projects
    SET projectStatus = 'completed'
    WHERE id = @id AND projectStatus = 'in progress';

    -- Update the Users table
    UPDATE users
    SET isAssigned = 0
    WHERE isAssigned = 1 AND id=@userID

    -- Commit the transaction
    COMMIT

END
