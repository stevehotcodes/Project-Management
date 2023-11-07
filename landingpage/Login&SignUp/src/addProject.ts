const modalForm_el=document.querySelector(".modal-form") as HTMLFormElement;
const projectTitle_el=document.querySelector(".project-title") as HTMLInputElement
const projectDescription_el=document.querySelector(".project-description") as HTMLInputElement
const projectDueDate_el=document.querySelector(".project-due-date-input") as HTMLInputElement
const createButton_el=document.querySelector(".create-new-project-btn")  as HTMLButtonElement
const openModalBtn=document.querySelector("#openModalBtn")as HTMLSpanElement
const closeModalBtn=document.querySelector("#closeModalBtn")as HTMLSpanElement


closeModalBtn.addEventListener("click", () => {
    modalForm_el.style.display = "none";
    location.href='./admin-dashboard.html'
 
});




console.log(
    modalForm_el,
    projectDescription_el,
    projectTitle_el,
    projectDueDate_el,
    createButton_el,
    openModalBtn,
    closeModalBtn

)

    modalForm_el.addEventListener("submit", async (event)=>{
       
        event.preventDefault()
        // projectTitle, projectDescription, projectDueDate
        let projectTitle=projectTitle_el.value;
        let projectDescription=projectDescription_el.value;
        let projectDueDate=projectDueDate_el.value;
    
        let statusInput=projectTitle !=="" && projectDescription !=="" && projectDueDate !=="";
        if(statusInput){
            console.log(projectDescription,projectDueDate,projectTitle)
    
            
                
                const createProjectResponse= await fetch("http://localhost:3000/projects/new",{
    
                    headers: {
                        'Accept':'application/json',
                        'Content-type':'application/json'
                        
                    },
                    method:'POST',
                    body:JSON.stringify({
                            "projectTitle":projectTitle,
                            "projectDescription":projectDescription,
                            "projectDueDate":projectDueDate
                        })
        
                });
                if(createProjectResponse.ok){
                    const res=await createProjectResponse.json()
                    console.log(res);
                    console.log("refresh this page",res.message);
                    location.href='./admin-dashboard.html'
    
                }
                else{
                    console.log("project creation unsuccessful ",createProjectResponse.statusText)
                }
    
                // const promise=new Promise((resolve,reject)=>{
                //     fetch('http://localhost:3000/projects/new',{
                //         headers:{
                //             'Accept': 'application/json',
                //             'Content-type': 'application/json'
                //         },
                //         method:"POST",
                //         body:JSON.stringify({
                            
                //             "projectTitle":projectTitle,
                //             "projectDescription":projectDescription,
                //             "projectDueDate":projectDueDate
                //         })
                //     }).then((res=>res.json())).then(data=>{
                //         console.log(data);
                //         // (redirectToLogin())
                //         resolve(data)
                //     }).catch(error=>{
                //         console.log({message:"error in registering the creating project",error})
                //     })
                // })
    
          
    
        }
    
    })



// const promise=new Promise((resolve,reject)=>{
//     fetch('http://localhost:3000/user/new',{
//         headers:{
//             'Accept': 'application/json',
//             'Content-type': 'application/json'
//         },
//         method:"POST",
//         body:JSON.stringify({
            
//             "fullname":fullname,
//             "email":email,
//             "password":password
//         })
//     }).then((res=>res.json())).then(data=>{
//         console.log(data);
//         (redirectToLogin())
//         resolve(data)
//     }).catch(error=>{
//         console.log({message:"error in registering the user",error})
//     })
// })