CREATE OR ALTER PROCEDURE addNewProject(
@id VARCHAR(255),
@projectTitle VARCHAR(255),
@projectDescription VARCHAR(255),
@projectDueDate DATE
)
AS
BEGIN

INSERT INTO projects (id,projectTitle,projectDescription,projectDueDate)
VALUES (@id, @projectTitle, @projectDescription ,@projectDueDate)
END

