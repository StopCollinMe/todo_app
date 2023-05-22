// class Project{
//     constructor(title){

//     }
// }

class TodoList{
    constructor(projectName, title,description,dueDate,priority,notes,checklist){
        this.projectName = projectName;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }
}

//Add + sign functionality



export {TodoList};