export class ToDoTaskCheckBox {
    constructor(toDoTask) {
        this.element = document.createElement('div');
        this.element.classList.add('toDoTaskCheckBox');
        this.toDoTask = toDoTask;

        this.taskSetIsChecked = this.toDoTask.setIsChecked.bind(toDoTask);
        this.saveTasks = this.toDoTask.saveTasks.bind(toDoTask);
        this.updateTasks = this.toDoTask.updateTasks.bind(toDoTask);

        this.element.addEventListener('click', () => {
            this.setIsChecked(!this.toDoTask.isChecked, true);
        });
            
        this.setIsChecked(this.toDoTask.isChecked, false);

        return this.element;
    }

    setIsChecked(isChecked, tasksUpdate) {
        this.taskSetIsChecked(isChecked, tasksUpdate);

        if (isChecked) {
            this.element.classList.add('toDoTaskCheckBox-checked');
        }

        else {
            this.element.classList.remove('toDoTaskCheckBox-checked')
        }
    }
}