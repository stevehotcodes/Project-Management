--USE ProjectManagementDB---
CREATE TABLE projects (
    id  VARCHAR(255) PRIMARY KEY  NOT NULL,
    projectTitle VARCHAR (255)  NOT NULL,
    projectDescription VARCHAR(255) NOT NULL,
    createdAt DATETIME  DEFAULT GETDATE(),
    projectDueDate DATE NOT NULL,
    projectStatus VARCHAR(255) DEFAULT 'unassigned' CHECK (projectStatus IN ('unassigned','assigned', 'in progress', 'completed'));
    projectComments VARCHAR(255),
    userID VARCHAR (255)  FOREIGN KEY REFERENCES users(id)
)

--SELECT * FROM projects--
--DROP TABLE projects---


