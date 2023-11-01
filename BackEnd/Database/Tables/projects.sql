--USE ProjectManagementDB---
CREATE TABLE projects (
    id  VARCHAR(MAX) PRIMARY KEY  NOT NULL,
    projectTitle VARCHAR (MAX)  NOT NULL,
    projectDescription VARCHAR(MAX) NOT NULL,
    createdAt DATETIME  DEFAULT GETDATE(),
    projectDueDate DATE NOT NULL,
    projectStatus VARCHAR(MAX) DEFAULT 'unassigned' CHECK (projectStatus IN ('unassigned','assigned', 'in progress', 'completed'));
    projectComments VARCHAR(MAX),
    userID VARCHAR (MAX)  FOREIGN KEY REFERENCES users(id)
)

--SELECT * FROM projects--
--DROP TABLE projects---


