import { ToDoTask } from "/src/js/components/ToDoTask.js";
import { AppData } from "/src/js/components/AppData.js";

export class ToDoList {
    toDoTasks = [];
    checkedTasks = [];

    constructor(name) {
        this.name = name;

        this.createListUI();
        this.loadTasks();
    }

    loadTasks() {
        this.checkForListinData();
        
        const storedList = AppData.data.lists[this.name] || {};

        const storedToDoList = storedList.toDoTasks || [];
        const storedCheckedList = storedToDoList.checkedTasks || [];

        const toDoParsedList = [];
        const checkedParsedList = [];

        for (let i = 0; i < storedToDoList.length; i++) {
            const storedTask = JSON.parse(storedToDoList[i]);
            const parsedTask = new ToDoTask(storedTask, this);

            toDoParsedList.push(parsedTask);
        }

        for (let i = 0; i < storedCheckedList.length; i++) {
            const storedTask = JSON.parse(storedCheckedList[i]);
            const parsedTask = new ToDoTask(storedTask, this);

            checkedParsedList.push(parsedTask);
        }

        
        this.toDoTasks = toDoParsedList;
        this.checkedTasks = checkedParsedList;

        this.updateTasks();
    }

    saveTasks() {
        this.checkForListinData();

        const toDoSerializedList = [];
        const checkedSerializedList = [];

        // left off

        for (let i = 0; i < this.toDoTasks.length; i++) {
            const task = this.toDoTasks[i];
            const JSONObject = {
                name: task.name,
                isChecked: task.isChecked,
                isStarred: task.isStarred,
            };
            const serializedTask = JSON.stringify(JSONObject);

            toDoSerializedList.push(serializedTask)
        }

        for (let i = 0; i < this.checkedTasks.length; i++) {
            const task = this.checkedTasks[i];
            const JSONObject = {
                name: task.name,
                isChecked: task.isChecked,
                isStarred: task.isStarred,
            };
            const serializedTask = JSON.stringify(JSONObject);

            checkedSerializedList.push(serializedTask)
        }

        AppData.data.lists[this.name] = {
            toDoTasks: toDoSerializedList,
            checkedTasks: checkedSerializedList
        };
        AppData.saveData();
    }

    addTask(task) {
        this.toDoTasks.unshift(task)
        this.saveTasks();

        this.updateTasks();
    }

    checkTask(task) {
        for (let i = 0; i < this.toDoTasks.length; i++) {
            const toDoTask = this.toDoTasks[i];

            if (task == toDoTask) {
                this.toDoTasks.splice(i, 1);

                this.checkedTasks.unshift(toDoTask);

                break;
            }
        }

        this.updateTasks();
    }

    uncheckTask(task) {
        for (let i = 0; i < this.checkedTasks.length; i++) {
            const checkedTask = this.checkedTasks[i];

            if (task == checkedTask) {
                this.checkedTasks.splice(i, 1);

                this.toDoTasks.unshift(checkedTask);

                break;
            }
        }

        this.updateTasks();
    }

    moveTask(task) {
        let hasPlacedAbove = false;
        let toDoTaskIndex = 0;

        for (let i = 0; i < this.toDoTasks.length; i++) {
            const toDoTask = this.toDoTasks[i];
            const isAbove = (toDoTask.relativeMousePosition == "top")

            if (isAbove && !hasPlacedAbove && task != toDoTask) {
                this.toDoTasks.splice(i, 0, task);
                hasPlacedAbove = true;
            }

            if (task == toDoTask) {
                toDoTaskIndex = i;
            }
        }

        this.toDoTasks.splice(toDoTaskIndex, 1);

        if (!hasPlacedAbove) {
            this.toDoTasks.push(task);
        }

        this.updateTasks();
    }

    removeTask(task) {
        let isRemoved = false;
        if (task.isChecked) {
            for (let i = 0; i < this.checkedTasks.length; i++) {
                const checkedTask = this.checkedTasks[i];

                if (task == checkedTask) {
                    this.checkedTasks.splice(i, 1);

                    isRemoved = true;
                }
            }
        }

        else {
            for (let i = 0; i < this.toDoTasks.length; i++) {
                const toDoTask = this.toDoTasks[i];

                if (task == toDoTask) {
                    this.toDoTasks.splice(i, 1);
                    
                    isRemoved = true;
                }
            }
        }

        if (isRemoved) {
            this.saveTasks();
            this.updateTasks();
        }
    }

    createListUI() {
        const listsContainer = document.getElementById('listsContainer');
        
        // create a new list container
        const list = document.createElement('div');

        // for to do's, container inside list container
        this.toDoTasksElement = document.createElement('div');
        this.toDoTasksElement.classList.add('toDoTasksContainer');
        list.appendChild(this.toDoTasksElement);

        // for checked tasks, container inside list container
        const details = document.createElement('details')
        list.appendChild(details);

        // inside checked tasks
        const summary = document.createElement('summary');
        summary.innerText = 'Checked tasks';
        details.appendChild(summary);

        this.checkedTasksElement = document.createElement('div');
        details.appendChild(this.checkedTasksElement)

        listsContainer.appendChild(list)
    }

    updateTasks() {
        this.toDoTasksElement.innerHTML = '';
        this.checkedTasksElement.innerHTML = '';

        for (let i = 0; i < this.toDoTasks.length; i++) {
            const task = this.toDoTasks[i];
            
            task.instantiate(this.toDoTasksElement)
        }

        for (let i = 0; i < this.checkedTasks.length; i++) {
            const task = this.checkedTasks[i];

            task.instantiate(this.checkedTasksElement);
        }
    }

    checkForListinData() {
        const areListsNotInData = (AppData.data["lists"] === undefined);

        if (areListsNotInData) {
            AppData.data.lists = {};
        }
    }
}