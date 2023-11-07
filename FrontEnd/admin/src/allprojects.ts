let projects:[]=[];
const apiUrl:string='http://localhost:3000/projects'
 interface IProject{
    id:string,
    projectTitle:string,
    projectDescription:string,
    createdAt:string,
    projectDueDate:string,
    projectStatus:'unassigned'| 'assigned' |'in progress' |'completed'
    projectComments:string,
    userID:string

}


window.addEventListener('load',()=>{})

const getAllProjects =async()=>{
    try {

        const fetchData=await fetch('http://localhost:3000/projects/all',{
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method:'GET',           
        }
         );
         const dataFetched:IProject[]=await fetchData.json()
         let resolvedData=dataFetched
        //  console.log(resolvedData)
         const projectCardWrapper=document.querySelector(".project-cards-wrapper")as HTMLDivElement
         const projectCard=document.querySelector(".project-card") as HTMLDivElement
         dataFetched.length===0?projectCardWrapper.innerHTML="no projects found":""

         resolvedData.forEach((el,i)=>{

            projectCardWrapper.innerHTML+= `
            <div class="project-card">
                <div ><span style="color:red ;display=inline">Project title:</span>${el.projectTitle}</div>
                <div><span style="color:red">Date due:</span>${el.projectDueDate}</div>
                <div><span style="color:red">Assign to:</span>${el.userID}</div>
                <div><span style="color:red">Status:</span>${el.projectStatus}</div>           
            </div>
                       
            `
         })
         
          



        
    } catch (error) {
        console.log("error in fetching",error)
    }
}
getAllProjects()


