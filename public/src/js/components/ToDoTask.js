import { ToDoTaskCheckBox } from "/src/js/components/ToDoTaskCheckBox.js";
import { ToDoTaskStar } from "/src/js/components/ToDoTaskStar.js";
import { ToDoTaskRemove } from "/src/js/components/ToDoTaskRemove.js";

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
        this.removeTask = this.toDoList.removeTask.bind(toDoList);
    }

    instantiate(listElement) {
        this.element = document.createElement('div');
        this.style = this.element.style;
        this.element.classList.add('toDoTaskContainer');
    
        this.element.addEventListener('mousedown', e => this.mouseDown(e))
        window.addEventListener('mousemove', e => this.mouseMove(e))
        window.addEventListener('mouseup', e => this.mouseUp(e))

        this.checkBox = new ToDoTaskCheckBox(this);

        const taskName = document.createElement('div');
        taskName.classList.add('toDoTaskContainer-taskName')
        taskName.innerText = this.name;

        this.taskStar = new ToDoTaskStar(this);

        this.taskRemove = new ToDoTaskRemove(this);

        this.element.appendChild(this.checkBox);
        this.element.appendChild(taskName);
        this.element.appendChild(this.taskStar);
        this.element.appendChild(this.taskRemove);

        listElement.appendChild(this.element);
    }

    mouseDown(e) {
        if (this.isChecked) {
            return;
        }

        if (e.target == this.checkBox || e.target == this.taskStar || e.target == this.taskRemove) {
            
        }

        else {
            this.isGrabbed = true;
            this.element.classList.add('toDoTaskContainer-dragging');
        }
    }

    mouseMove(e) {
        if (this.isChecked) {
            return;
        }

        const top = this.element.getBoundingClientRect().top;
        const height = this.element.getBoundingClientRect().height;
        const midPoint = top + (height / 2);

        if (e.pageY > midPoint) {
            this.relativeMousePosition = "bottom";
        }

        else {
            this.relativeMousePosition = "top";
        }

        if (this.isGrabbed) {
            const yPos = e.pageY - (height / 2) + "px";
    
            this.style.top = yPos;
        }

    }

    mouseUp(e) {
        if (this.isChecked) {
            return;
        }

        if (this.isGrabbed) {
            this.element.classList.remove('toDoTaskContainer-dragging');
            this.isGrabbed = false;
            this.style.top = 'unset';

            this.toDoList.moveTask(this);
        }
    }

    setIsChecked(isChecked, tasksUpdate) {
        this.isChecked = isChecked;

        if (tasksUpdate) {
            if (this.isChecked) {
                this.toDoList.checkTask(this);
            }

            else {
                this.toDoList.uncheckTask(this);
            }
        }

        this.saveTasks();
    }

    setIsStarred(isStarred, tasksUpdate) {
        this.isStarred = isStarred;

        if (tasksUpdate) {
            this.updateTasks();
        }
    
        this.saveTasks();
    }


}