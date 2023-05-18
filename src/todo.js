import _ from 'lodash';
import './styles.css';
import 'date-fns';
import '@mdi/font/css/materialdesignicons.css';


//Automates selecting element, adding an event listener, and adding functionality
//Was spicy. Proud of myself for this one
const addButtonClick = (ref, type, func) => {
    if(type == 'class'){
        const button = document.querySelector(`.${ref}`);
        button.addEventListener('click', func);
    }
    else if(type == 'id'){
        const button = document.querySelector(`#${ref}`);
        button.addEventListener('click', func);
    }
}

const handleAlert = () => {
    alert('Yay!');
}

const openMenu = () => {
    //Add class
    //Remove class on second round
}

addButtonClick('mdi-menu','class', () => openMenu());

//Add projectAdder to menu
//Add projectChild to project created by projectAdder

