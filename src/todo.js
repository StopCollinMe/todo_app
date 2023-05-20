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

const projects = [];
console.log(projects);

const newProject = () => {

    const title = grabDomValue('#title');
    const description = grabDomValue('#description');
    const dueDate = grabDomValue('#due-date');
    const priority = grabDomValue('#priority');
    const notes = grabDomValue('#notes');

    const toDoList = new TodoList(title, description, dueDate, priority, notes);
    projects.push(toDoList);

}

const clearForm = () =>{
    const form = grabDom('.form');
    form.reset();
}

const submit = () =>{
    const form = grabDom('.form');
    console.log(form);
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        newProject();
        clearForm();
    });
}

submit();

//On click add new html file that shows a screen to make a new object from ToDoList
//Also takes in Project Name and adds it to left side menu.
//After Project Name is added a
addButtonClick('mdi-plus','class', ()=> newProject());
addButtonClick('mdi-menu','class',()=> toggleMenu('menu','hide'),()=> 
toggleMenu('mdi-menu','tabbed'), ()=> 
toggleMenu('display','toggleDisplay'));

//Make this dynamic based off of input via webpage.
//Add limitations
//Add calender? Might be too ambitious

const first = new TodoList('first', 'description','3/30', 'first', 'Yes', 'checklist');

console.log(first);

//Add projectAdder to menu
//Add projectChild to project created by projectAdder

