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
        
        this.element = document.createElement('div');

        const details = document.createElement('details')
        const summary = document.createElement('summary');
        summary.innerText = 'Checked tasks';
        details.appendChild(summary);

        this.checkedTasksElement = document.createElement('div');
        details.appendChild(this.checkedTasksElement)

        listsContainer.appendChild(this.element);
        listsContainer.appendChild(details);
    }

    updateTasks() {
        this.element.innerHTML = '';
        this.checkedTasksElement.innerHTML = '';

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];

            if (task.isChecked) {
                task.instantiate(this.checkedTasksElement);
            }

            else {
                task.instantiate(this.element)
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