export class ToDoTaskCheckBox {
    constructor(isChecked, setIsChecked) {
        this.element = document.createElement('div');
        this.element.classList.add('toDoTaskCheckBox');
        this.setIsChecked = setIsChecked;

        this.element.addEventListener('click', () => {
            this.toggleChecked();
        });

        if (isChecked) {
            this.toggleChecked();
        }

        return this.element;
    }

    toggleChecked() {
        const isChecked = this.element.classList.contains('toDoTaskCheckBox-checked');
        this.setIsChecked(isChecked);
        console.log(this)
        this.saveTasks();

        if (isChecked) {
            this.element.classList.remove('toDoTaskCheckBox-checked');
        }

        else {
            this.element.classList.add('toDoTaskCheckBox-checked')
        }
    }
}