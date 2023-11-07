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
let projects = [];
const apiUrl = 'http://localhost:3000/projects';
window.addEventListener('load', () => { });
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchData = yield fetch('http://localhost:3000/projects/all', {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: 'GET',
        });
        const dataFetched = yield fetchData.json();
        let resolvedData = dataFetched;
        //  console.log(resolvedData)
        const projectCardWrapper = document.querySelector(".project-cards-wrapper");
        const projectCard = document.querySelector(".project-card");
        dataFetched.length === 0 ? projectCardWrapper.innerHTML = "no projects found" : "";
        resolvedData.forEach((el, i) => {
            projectCardWrapper.innerHTML += `
            <div class="project-card">
                <div ><span style="color:red ;display=inline">Project title:</span>${el.projectTitle}</div>
                <div><span style="color:red">Date due:</span>${el.projectDueDate}</div>
                <div><span style="color:red">Assign to:</span>${el.userID}</div>
                <div><span style="color:red">Status:</span>${el.projectStatus}</div>           
            </div>
                       
            `;
        });
    }
    catch (error) {
        console.log("error in fetching", error);
    }
});
getAllProjects();
