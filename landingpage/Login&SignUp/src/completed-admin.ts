// let projects:[]=[];
// const apiUrl:string='http://localhost:3000/projects'
 interface IProject{
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


window.addEventListener('load',()=>{})

const getCompletedProjects =async()=>{
    try {

        const fetchData=await fetch('http://localhost:3000/projects/completed',{
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method:'GET',           
        }
         );
         const dataFetched:IProject[]=await fetchData.json();
         let resolvedData=dataFetched;
         console.log(resolvedData)
         const projectCardWrapper=document.querySelector(".project-cards-wrapper")as HTMLDivElement;
         

         const projectCard=document.querySelector(".project-card") as HTMLDivElement
         let projectTitle=document.querySelector(".projectTitle") as HTMLDivElement
         const projectDueDate=document.querySelector(".projectDueDate") as HTMLDivElement
         const projectStatus=document.querySelector(".projectStatus") as HTMLDivElement
        
         dataFetched.length===0?projectCardWrapper.innerHTML="no projects found":


        

         resolvedData.forEach((el,i)=>{
            // const projectsDiv=document.createElement('.div')
            const projectCardsWrapper=document.createElement("div");
         

            projectCardWrapper.innerHTML+=`
            <div class="project-card">
                <div style="display=flex" class="projectTitle" ><span style="color:red ;display=flex">Project title:</span><div>${el.projectTitle}</div></div>
                <div style="display=flex" class="projectDueDate"><span style="color:red">Date due:</span><div>${el.projectDueDate}</div></div>
                <div style="display=flex" class="userID"><span style="color:red">Assign to:</span><div>${el.fullname}<div></div>
                <div style="display=flex" class="projectStatus"><span style="color:red">Status:</span><div>${el.projectStatus}</div></div>           
             </div>
                    
            `         
         })
                
    } catch (error) {
        console.log("error in fetching",error)
    }
}




getCompletedProjects()


