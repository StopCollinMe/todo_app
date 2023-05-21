import _ from 'lodash';
import './styles.css';
import 'date-fns';
import '@mdi/font/css/materialdesignicons.css';
import './projectCreator';
import { TodoList } from './projectCreator';


//Automates selecting element, adding an event listener, and adding functionality
//Was spicy. Proud of myself for this one
const addButtonClick = (ref, type, ...funcs) => {
    if(type == 'class'){
        const button = document.querySelector(`.${ref}`);
        button.addEventListener('click', () =>{
            funcs.forEach(func => func());
        });
    }
    else if(type == 'id'){
        const button = document.querySelector(`#${ref}`);
        button.addEventListener('click', () =>{
            funcs.forEach(func => func());
        });
    }
}


const grabDom = (element) =>{
    let selector;
    if(element.startsWith('.')){
        selector = element;
    }
    else if(element.startsWith('#')){
        selector = element;
    }
    const item = document.querySelector(selector);
    return item ? item : null;
}

const grabDomValue = (element) =>{
    let selector;
    if(element.startsWith('.')){
        selector = element;
    }
    else if(element.startsWith('#')){
        selector = element;
    }
    const item = document.querySelector(selector);
    return item ? item.value : null;
}

//SUCCESSFULLY MADE SOME DYNAMIC CODE!!!!!
const toggleMenu = (select, className) =>{
    const element = document.querySelector(`.${select}`);
    element.classList.toggle(`${className}`);
}

const project = [];
const toDo = [];


const newProject = () =>{
    const projectName = grabDomValue('#project');
    project.push(projectName);
    pushProject();
}


const pushProject = () =>{
    const element = grabDom('.menu');
    element.innerHTML = '';

    project.forEach((projectName)=>{
        const newDiv = document.createElement('div');
        newDiv.innerText = projectName;
        element.appendChild(newDiv);
    });
}


//We need to make a way to append a new child div to the newProject

const newToDo = () => {
    const projectName = grabDomValue('#project');
    const title = grabDomValue('#title');
    const description = grabDomValue('#description');
    const dueDate = grabDomValue('#due-date');
    const priority = grabDomValue('#priority');
    const notes = grabDomValue('#notes');

    const toDoList = new TodoList(projectName, title, description, dueDate, priority, notes);
    toDo.push(toDoList);
    pushToDo();

}



 //Pushes the title to the left

const pushToDo = () =>{
//Figure out how to push the title of the newToDo to the project if it has the same projectName



}

const clearForm = () =>{
    const form = grabDom('.form');
    form.reset();
}

const submit = () =>{
    const form = grabDom('.form');
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        newToDo();
        newProject();
        clearForm();
    });
}

submit();

//On click add new html file that shows a screen to make a new object from ToDoList
//Also takes in Project Name and adds it to left side menu.
//After Project Name is added a
addButtonClick('mdi-plus','class', ()=> newToDo());
addButtonClick('mdi-menu','class',()=> toggleMenu('menu','hide'),()=> 
toggleMenu('mdi-menu','tabbed'), ()=> 
toggleMenu('display','toggleDisplay'));


//Add evenListner click to every div in left bar that brings up your