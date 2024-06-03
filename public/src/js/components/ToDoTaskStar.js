export class ToDoTaskStar {
    constructor(toDoTask) {
        this.element = document.createElement('div');
        this.element.classList.add('toDoTaskStar');
        this.toDoTask = toDoTask;
        this.saveTasks = this.toDoTask.saveTasks.bind(toDoTask);

        this.element.addEventListener('click', () => {
            this.setIsStarred(!this.toDoTask.isStarred);
        });

        this.setIsStarred(this.toDoTask.isStarred);

        return this.element;
    }

    setIsStarred(isStarred) {
        this.toDoTask.isStarred = isStarred;
        this.saveTasks();

        if (isStarred) {
            this.element.classList.add('toDoTaskStar-starred');
        }

        else {
            this.element.classList.remove('toDoTaskStar-starred')
        }
    }
}