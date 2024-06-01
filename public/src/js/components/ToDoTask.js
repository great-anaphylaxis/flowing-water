import { ToDoTaskCheckBox } from "/src/js/components/ToDoTaskCheckBox.js";
import { ToDoTaskStar } from "/src/js/components/ToDoTaskStar.js";

export class ToDoTask {
    isStarred = false;
    isChecked = false;

    constructor(params, saveTasksFunction) {
        if (typeof params === 'string') {
            this.name = params;
        }
        
        else {
            this.name = params.name;
            this.isStarred = params.isStarred;
            this.isChecked = params.isChecked;
        }

        this.saveTasksFunction = saveTasksFunction;
    }

    instantiate(listElement) {
        const taskContainer = document.createElement('div');

        const checkBox = new ToDoTaskCheckBox(this.isChecked, this.setIsChecked);

        const taskName = document.createElement('label');
        taskName.innerText = this.name;

        const taskStar = new ToDoTaskStar(this.isStarred, this.setIsStarred);

        taskContainer.appendChild(checkBox);
        taskContainer.appendChild(taskName);
        taskContainer.appendChild(taskStar);

        listElement.appendChild(taskContainer);
    }

    setIsChecked(isChecked) {
        this.isChecked = isChecked;
    }

    setIsStarred(isStarred) {
        this.isStarred = isStarred;
    }

    saveTasks() {
        this.saveTasksFunction()
    }
}