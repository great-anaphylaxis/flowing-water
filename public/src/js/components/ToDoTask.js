import { ToDoTaskCheckBox } from "/src/js/components/ToDoTaskCheckBox.js";
import { ToDoTaskStar } from "/src/js/components/ToDoTaskStar.js";

export class ToDoTask {
    isStarred = false;
    isChecked = false;

    constructor(params, toDoList) {
        if (typeof params === 'string') {
            this.name = params;
        }
        
        else {
            this.name = params.name;
            this.isStarred = params.isStarred;
            this.isChecked = params.isChecked;
        }

        this.toDoList = toDoList;
        this.saveTasks = this.toDoList.saveTasks.bind(toDoList);
        this.updateTasks = this.toDoList.updateTasks.bind(toDoList);
    }

    instantiate(listElement) {
        const taskContainer = document.createElement('div');

        const checkBox = new ToDoTaskCheckBox(this);

        const taskName = document.createElement('label');
        taskName.innerText = this.name;

        const taskStar = new ToDoTaskStar(this);

        taskContainer.appendChild(checkBox);
        taskContainer.appendChild(taskName);
        taskContainer.appendChild(taskStar);

        listElement.appendChild(taskContainer);
    }


}