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

console.log(toDo);
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
        newDiv.classList.add(projectName);
        element.appendChild(newDiv);
        findMonkey();
    });
}



//This might be what we need!
//The first time I've gotten something to append. 
//Figure this out tomorrow hopefully...
  const findMonkey = () => {
    const monkey = document.querySelector('.Monkey');
    if (monkey) {
      const newDiv = document.createElement('div');
      newDiv.innerText = 'Sandwich!';
      monkey.appendChild(newDiv);
    }
  };

  // Create a new MutationObserver
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      // Check if a node was added to the DOM
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if the added node has the class "Monkey"
        if (mutation.addedNodes[0].classList.contains('Monkey')) {
          // Call findMonkey when the Monkey element is found
          findMonkey();

          // Disconnect the observer since it's no longer needed
          observer.disconnect();
          break;
        }
      }
    }
  });

  // Start observing changes in the document's body
  observer.observe(document.body, { childList: true, subtree: true });


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
    // pushToDo();
    loopThroughToDoforTitle();

}

// const pushToDo = () => {
//     const divElements = Array.from(document.getElementsByTagName('div'));
//     console.log(divElements);
//     toDo.forEach((todo) =>{
//     const foundDiv = divElements.find(div => div.innerText === `${todo.title}`);
//     console.log(foundDiv);
//         if(foundDiv){
//             const newDiv = document.createElement('div');
            
//             newDiv.innerText = todo.title;
//             console.log(newDiv);
//             console.log(newDiv.innerText);
//             foundDiv.appendChild(newDiv);

//         }
//     });
//   };
  

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

const loopThroughToDoforTitle = () => {

  };





submit();

//On click add new html file that shows a screen to make a new object from ToDoList
//Also takes in Project Name and adds it to left side menu.
//After Project Name is added a
addButtonClick('mdi-plus','class', ()=> newToDo());
addButtonClick('mdi-menu','class',()=> toggleMenu('menu','hide'),()=> 
toggleMenu('mdi-menu','tabbed'), ()=> 
toggleMenu('display','toggleDisplay'));


//Add evenListner click to every div in left bar that brings up your