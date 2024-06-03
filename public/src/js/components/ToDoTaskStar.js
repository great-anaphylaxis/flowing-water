export class ToDoTaskStar {
    constructor(toDoTask) {
        this.element = document.createElement('div');
        this.element.classList.add('toDoTaskStar');
        this.toDoTask = toDoTask;
        this.saveTasks = this.toDoTask.saveTasks.bind(toDoTask);
        this.updateTasks = this.toDoTask.updateTasks.bind(toDoTask);

        this.element.addEventListener('click', () => {
            this.setIsStarred(!this.toDoTask.isStarred, true);
        });

        this.setIsStarred(this.toDoTask.isStarred, false);

        return this.element;
    }

    setIsStarred(isStarred, tasksUpdate) {
        this.toDoTask.isStarred = isStarred;

        if (tasksUpdate) {
            this.updateTasks();
        }

        this.saveTasks();

        if (isStarred) {
            this.element.classList.add('toDoTaskStar-starred');
        }

        else {
            this.element.classList.remove('toDoTaskStar-starred')
        }
    }
}