"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener('load', () => { });
const getCompletedProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchData = yield fetch('http://localhost:3000/projects/completed', {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: 'GET',
        });
        const dataFetched = yield fetchData.json();
        let resolvedData = dataFetched;
        console.log(resolvedData);
        const projectCardWrapper = document.querySelector(".project-cards-wrapper");
        const projectCard = document.querySelector(".project-card");
        let projectTitle = document.querySelector(".projectTitle");
        const projectDueDate = document.querySelector(".projectDueDate");
        const projectStatus = document.querySelector(".projectStatus");
        dataFetched.length === 0 ? projectCardWrapper.innerHTML = "no projects found" :
            resolvedData.forEach((el, i) => {
                // const projectsDiv=document.createElement('.div')
                const projectCardsWrapper = document.createElement("div");
                projectCardWrapper.innerHTML += `
            <div class="project-card">
                <div style="display=flex" class="projectTitle" ><span style="color:red ;display=flex">Project title:</span><div>${el.projectTitle}</div></div>
                <div style="display=flex" class="projectDueDate"><span style="color:red">Date due:</span><div>${el.projectDueDate}</div></div>
                <div style="display=flex" class="userID"><span style="color:red">Assign to:</span><div>${el.fullname}<div></div>
                <div style="display=flex" class="projectStatus"><span style="color:red">Status:</span><div>${el.projectStatus}</div></div>           
             </div>
                    
            `;
            });
    }
    catch (error) {
        console.log("error in fetching", error);
    }
});
getCompletedProjects();
