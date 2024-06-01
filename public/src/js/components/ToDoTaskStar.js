export class ToDoTaskStar {
    constructor(isStarred, setIsStarred) {
        this.element = document.createElement('div');
        this.element.classList.add('toDoTaskStar');
        this.setIsStarred = setIsStarred;

        this.element.addEventListener('click', () => {
            this.toggleStarred();
        });

        if (isStarred) {
            this.toggleStarred();
        }

        return this.element;
    }


    toggleStarred() {
        const isStarred = this.element.classList.contains('toDoTaskStar-starred');
        this.setIsStarred(isStarred);
        this.saveTasks();

        if (isStarred) {
            this.element.classList.remove('toDoTaskStar-starred');
        }

        else {
            this.element.classList.add('toDoTaskStar-starred')
        }
    }
}