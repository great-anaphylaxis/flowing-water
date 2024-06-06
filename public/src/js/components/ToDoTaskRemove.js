export class ToDoTaskRemove {
    constructor(toDoTask) {
        this.element = document.createElement('img');
        this.element.classList.add('toDoTaskRemove');
        this.element.src = '/src/icons/trash.png';
        this.toDoTask = toDoTask;

        this.element.addEventListener('click', () => {
            this.toDoTask.removeTask(this.toDoTask)
        });

        return this.element;
    }
}