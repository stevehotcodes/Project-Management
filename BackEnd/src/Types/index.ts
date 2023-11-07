export interface IUser{
    id:string,
    fullname:string
    email:string,
    password:string
    role :string,
    dateRegistered:string
    isDeleted: 0 | 1
}

export interface ILoginUser extends Request{
    email: string,
    password: string
}


export interface IuserPayLoad extends Request{
    id:string,fullName:string,email:string,role:string
}
export interface ExtendedUserRequest extends Request{
    info?:IdecodedData
}




export interface IdecodedData{
    id:string,
    fullname:string,
    role: 'employee' |'admin',
    email:string
}

export interface IProject{
    id:string,
    projectTitle:string,
    projectDescription:string,
    createdAt:string,
    projectDueDate:string,
    projectStatus:'unassigned'| 'assigned' |'in progress' |'completed'
    projectComments:string,
    userID:string
    fullname:string

}
export interface IUnassignedUser{
    id:string,
    fullname:string,
    email:string
}

// "id": "9ed4430d-9a6b-41f8-a169-d23f9ec5f20e",
// "fullname": "Stephen Ondieki",
// "email": "ondiekistephen00@gmail.com"