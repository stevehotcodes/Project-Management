let unassignedProjects:[]=[]
let unassignedUsers:[]=[]
interface IUser{
    id:string,
    fullname:string
    email:string,
    password:string
    role :string,
    dateRegistered:string
    
}


const getUnAssignedProject=async ()=>{
    try {
        const fetchUnassignedProjects=await fetch('http://localhost:3000/projects/unassigned',{
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method:'GET',           
        })
        const dataResolved:IProject[]=await fetchUnassignedProjects.json();
        console.log(dataResolved)
        // let unassignedUsers=getUnAssignedUsers()
        // console.log("list of unlist ",unassignedUsers)

        const projectCardWrapper=document.querySelector(".project-cards-wrapper")as HTMLDivElement;
        

        const projectCard=document.querySelector(".project-card") as HTMLDivElement
        let projectTitle=document.querySelector(".projectTitle") as HTMLDivElement
        const projectDueDate=document.querySelector(".projectDueDate") as HTMLDivElement
        const projectStatus=document.querySelector(".projectStatus") as HTMLDivElement
    
        dataResolved.length===0?projectCardWrapper.innerHTML="no projects found":"";
        

       

        dataResolved.forEach((el,i)=>{
           // const projectsDiv=document.createElement('.div')
           const projectCardsWrapper=document.createElement("div");
        

           projectCardWrapper.innerHTML+=`
           <div class="project-card">
               <div style="display=flex" class="projectTitle" ><span style="color:red ;display=flex">Project title:</span><div>${el.projectTitle}</div></div>
               <div style="display=flex" class="projectDueDate"><span style="color:red">Date due:</span><div>${el.projectDueDate}</div></div>
               <div style="display=flex" class="userID"><span style="color:red">Assign to:</span><div>${el.fullname}<div></div>
               <div style="display=flex" class="projectStatus"><span style="color:red">Status:</span><div>${el.projectStatus}</div></div> 
               <select> <option></option><select>          
            </div>
       
           
           `      


        })
    } 





        
        
    
    
     catch (error) {
        console.log(error)
    
 
}
}
const getUnAssignedUsers=async () => {
    try{
        const fetchUnassignedUsers=await fetch('http://localhost:3000/user/unassigned',{
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method:'GET',           
        })
        const dataResolved:IUser[]=await fetchUnassignedUsers.json();
        const userlist=dataResolved
        return userlist
        // console.log("unassigned users",userlist);
        
    }
    catch(error){
        console.log(error)
    }
}


// const getAllUsers =async()=>{
//     try {

//         const fetchData=await fetch('http://localhost:3000/users/all',{
//             headers:{
//                 'Accept': 'application/json',
//                 'Content-type': 'application/json'
//             },
//             method:'GET',           
//         }
//          );
//          const dataFetched:IProject[]=await fetchData.json();
//          let resolvedData=dataFetched;
        //  console.log(resolvedData)
        //  const projectCardWrapper=document.querySelector(".project-cards-wrapper")as HTMLDivElement;
         

        //  const projectCard=document.querySelector(".project-card") as HTMLDivElement
        //  let projectTitle=document.querySelector(".projectTitle") as HTMLDivElement
        //  const projectDueDate=document.querySelector(".projectDueDate") as HTMLDivElement
        //  const projectStatus=document.querySelector(".projectStatus") as HTMLDivElement
        
        //  dataFetched.length===0?projectCardWrapper.innerHTML="no projects found":"";


        

        //  dataFetched.forEach((el,i)=>{
        //     // const projectsDiv=document.createElement('.div')
        //     const projectCardsWrapper=document.createElement("div");
         

        //     projectCardWrapper.innerHTML+=`
        //     <div class="project-card">
        //         <div style="display=flex" class="projectTitle" ><span style="color:red ;display=flex">Project title:</span><div>${el.projectTitle}</div></div>
        //         <div style="display=flex" class="projectDueDate"><span style="color:red">Date due:</span><div>${el.projectDueDate}</div></div>
        //         <div style="display=flex" class="userID"><span style="color:red">Assign to:</span><div>${el.fullname}<div></div>
        //         <div style="display=flex" class="projectStatus"><span style="color:red">Status:</span><div>${el.projectStatus}</div></div>           
        //      </div>
        
            
        //     `      


         
                      
            
//          })
                
//     } catch (error) {
//         console.log("error in fetching",error)
//     }
// }
getUnAssignedProject()
getUnAssignedUsers()