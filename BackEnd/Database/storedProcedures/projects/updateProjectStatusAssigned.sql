CREATE OR ALTER PROCEDURE updateProjectStatusToAssigned(
	@id VARCHAR (255),
	@userID VARCHAR(255)
)
AS
BEGIN
	 BEGIN TRANSACTION
	 
	 -- Update the Projects table
    UPDATE projects
    SET projectStatus = 'assigned', userID =@userID
    WHERE id = @id AND projectStatus = 'unassigned';

    -- Update the Users table
    UPDATE Users
    SET isAssigned = 1
    WHERE isAssigned = 0 AND id=@userID

    -- Commit the transaction
    COMMIT

END
