export class ToDoTaskCheckBox {
    constructor(toDoTask) {
        this.element = document.createElement('div');
        this.element.classList.add('toDoTaskCheckBox');
        this.toDoTask = toDoTask;
        this.saveTasks = this.toDoTask.saveTasks.bind(toDoTask);

        this.element.addEventListener('click', () => {
            this.setIsChecked(!this.toDoTask.isChecked);
        });
            
        this.setIsChecked(this.toDoTask.isChecked);

        return this.element;
    }

    setIsChecked(isChecked) {
        this.toDoTask.isChecked = isChecked;
        this.saveTasks();

        if (isChecked) {
            this.element.classList.add('toDoTaskCheckBox-checked');
        }

        else {
            this.element.classList.remove('toDoTaskCheckBox-checked')
        }
    }
}