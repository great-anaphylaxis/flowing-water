import { ToDoTask } from "/src/js/components/ToDoTask.js";
import { AppData } from "/src/js/components/AppData.js";

export class ToDoList {
    tasks = [];

    constructor(name) {
        this.name = name;

        this.createListUI();
        this.loadTasks();
    }

    loadTasks() {
        this.checkForListinData();
        
        const storedList = AppData.data.lists[this.name] || [];
        const parsedList = [];

        for (let i = 0; i < storedList.length; i++) {
            const storedTask = JSON.parse(storedList[i]);
            const parsedTask = new ToDoTask(storedTask, this);

            parsedList.push(parsedTask);
        }
        
        this.tasks = parsedList;

        this.updateTasks();
    }

    saveTasks() {
        this.checkForListinData();

        const serializedList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const JSONObject = {
                name: task.name,
                isChecked: task.isChecked,
                isStarred: task.isStarred,
            };
            const serializedTask = JSON.stringify(JSONObject);

            serializedList.push(serializedTask)
        }

        AppData.data.lists[this.name] = serializedList;
        AppData.saveData();
    }

    addTask(task) {
        this.tasks.unshift(task)
        this.saveTasks();

        this.updateTasks();
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

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];

            if (task.isChecked) {
                task.instantiate(this.checkedTasksElement);
            }

            else {
                task.instantiate(this.toDoTasksElement)
            }
        }
    }

    checkForListinData() {
        const areListsNotInData = (AppData.data["lists"] === undefined);

        if (areListsNotInData) {
            AppData.data.lists = {};
        }
    }
}