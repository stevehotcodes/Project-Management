CREATE TABLE projects (
    id  VARCHAR(MAX) PRIMARY KEY  NOT NULL,
    projectTitle VARCHAR (MAX)  NOT NULL,
    projectDescription VARCHAR(MAX) NOT NULL,
    createdAt DATETIME  DEFAULT GETDATE(),
    projectDueDate DATE NOT NULL,
    projectStatus VARCHAR(MAX) DEFAULT 'unassigned' CHECK (projectStatus IN ('unassigned', 'in progress', 'completed'));

)