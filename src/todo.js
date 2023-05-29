import _, { indexOf } from 'lodash';
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

console.log(toDo);
const newProject = () =>{
    const projectName = grabDomValue('#project');
    project.push(projectName);
    pushProject();
}


const pushProject = () =>{
    const element = grabDom('.projDisplay');
    element.innerHTML = '';

    project.forEach((projectName)=>{
        const newDiv = document.createElement('div');
        newDiv.innerText = projectName;
        newDiv.addEventListener('click', ()=>{
            loadToDo();
        });
        element.appendChild(newDiv);
        newDiv.addEventListener('click', ()=> showProjects());
    });
}

const showProjects = () =>{
    submitProject();
}


//Do this
const loadToDo = () => {
    const display = document.querySelector('.display');

    //This is dangerous!!!!!! DO NOT REMOVE ALL OF INNNERHTML Unless you know what you're doing!!!
    //Your hidden elements will go missing too. And cause a lot of stupid trouble

    display.innerHTML = '';

    //Next time write more html so you don't have to worry about z-index confusion.
    //We're not fixing it here, but we'll fix it in the next project. It'll be simpler, but we're too deep rn
    const newHTML = `
<form class="project-form hide">
        <label for="project">Project Name: </label>
        <input type="text" id="project">
        <input type="submit" id="project-submit"></input>
</form>
        
    
<form class="todo-form hide">

    <div class="form-row">
        <label for="title">Title: </label>
        <input type="text" id="title">
    </div>

    <div class="form-row">
        <label for="description">Description: </label>
        <input type="text" id="description">
    </div>

    <div class="form-row">
        <label for="due-date">Due date:</label>
        <input type="text" id="due-date">
    </div>

    <div class="form-row">
        <label for="priority">Priority: </label>
        <input type="text" id="priority">
    </div>

    <div class="form-row">
        <label for="notes">Notes: </label>
        <input type="text" id="notes">
    </div>
    
    <div class="form-row">
        <input type="submit" id="todo-submit"></input>
    </div>
</form>`
    display.innerHTML = newHTML;

   //Figure out why this is clearing the left side bar instead of appending below the existing content.

    const newDiv = document.createElement('div');
    newDiv.classList.add('newSpanParent')
    display.append(newDiv);



    const newSpan = document.createElement('span');
    newSpan.innerText = 'New To Do';
    newSpan.classList.add('mdi','mdi-plus', 'newSpan');
    newDiv.append(newSpan);
    newSpan.addEventListener('click', () => {
        const todoForm = document.querySelector('.todo-form');
        todoForm.classList.remove('hide');
    });


    // Make this into an event listener when we click the project name

    const form = grabDom('.todo-form');



    //Don't be lazy. Just make a new div and clear the innerHTML...
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('todo-container');
    newDiv.prepend(containerDiv);

    const newH1 = document.createElement('h1');
    newH1.classList.add('newH1')
    newH1.innerText = 'Hello'; //Eventually make this the project name we're working on.
    newDiv.insertBefore(newH1, containerDiv);

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        newToDo();
        clearForm('.todo-form');
        containerDiv.innerHTML = '';
        //Make this toDo dynamic so that when we click on the left it opens the correct one, AND once you make the project it knows where to go
        
        
            toDo.forEach((todo) => {
                const wrapperDiv = document.createElement('div');
                const newButton = document.createElement('button');
                const newDiv = document.createElement('div');
                const descriptionDiv = document.createElement('div');

                newDiv.innerText = todo.title;
                descriptionDiv.innerText = todo.description;

                wrapperDiv.style.borderBottom = '1px solid rgb(214, 214, 214)';



                newDiv.style.marginBottom = '.25em';
                descriptionDiv.style.marginBottom ='1em';
                descriptionDiv.style.marginLeft = '1.25em';
                newDiv.style.marginTop = '.25em';
                newButton.style.display = 'inline-block'; // Set display property to inline-block
                newDiv.style.display = 'inline-block';

                containerDiv.appendChild(wrapperDiv);
                wrapperDiv.appendChild(newButton);
                wrapperDiv.appendChild(newDiv);
                wrapperDiv.append(descriptionDiv);

                newButton.addEventListener('click', () => {
                    wrapperDiv.innerHTML = '';
                    descriptionDiv.innerHTML = '';
                    wrapperDiv.style = '';
                    const index = toDo.indexOf(todo);
                    if(index != -1){
                        toDo.splice(index,1);
                    }
                });

            });
        });
        
    addButtonClick('todo-submit','id', ()=>hide('.todo-form'));
    submitProject();
}




//We need to make a way to append a new child div to the newProject

const newToDo = () => {

    const title = grabDomValue('#title');
    const description = grabDomValue('#description');
    const dueDate = grabDomValue('#due-date');
    const priority = grabDomValue('#priority');
    const notes = grabDomValue('#notes');

    //We'll try another way first. This one may be the right option.
    // const toDoLists = [];
    // toDoLists.push(toDoList);
    // toDo.push(toDoList); would replace this with the current one similar to this.

    const toDoList = new TodoList(title, description, dueDate, priority, notes);

    toDo.push(toDoList);
    // pushToDo();

}
  

const clearForm = (name) =>{
    const form = grabDom(`${name}`);
    form.reset();
}

const submit = () =>{
    const form = grabDom('.todo-form');
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        newToDo();
        clearForm('.todo-form');
    });
}

const hide = (ele) =>{
    const form = grabDom(`${ele}`);
    form.classList.add('hide');
}

const removeHide = (ele) => {
    const form = grabDom(`${ele}`);
    form.classList.remove('hide');
}

const submitProject = () =>{
    const form = grabDom('.project-form');
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        newProject();
        clearForm('.project-form');
        loadToDo();
    });
}



submit();
submitProject();

//On click add new html file that shows a screen to make a new object from ToDoList
//Also takes in Project Name and adds it to left side menu.
//After Project Name is added a

addButtonClick('addProjectNav','class', ()=>removeHide('.project-form'));
addButtonClick('addProjectMenu','class', ()=>removeHide('.project-form'));

addButtonClick('inner-span','class', ()=>removeHide('.project-form'));
addButtonClick('project-submit','id', ()=>hide('.project-form'));



addButtonClick('todo-submit','id', ()=>hide('.todo-form'));

addButtonClick('mdi-plus','class', ()=> newToDo());
addButtonClick('mdi-menu','class',()=> toggleMenu('menu','hide'),()=> 
toggleMenu('mdi-menu','tabbed'), ()=> 
toggleMenu('display','toggleDisplay'));


//Add evenListner click to every div in left bar that brings up your