CREATE OR ALTER PROCEDURE addProjectComments(
@id VARCHAR(255) --req.params
@projectComments VARCHAR (255) --body 
)
AS
BEGIN

    UPDATE projects
    SET projectComments=@projectComments
    WHERE id=@id AND projectStatus='in progress'
   
END