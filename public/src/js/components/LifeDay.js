export class LifeDay {
    constructor(lifeCalendar, month, day) {
        this.month = month - 1;
        this.day = day;

        this.element = document.createElement('div');
        this.element.classList.add('lifeDay');
        this.element.innerText = day;
        this.element.addEventListener('click', () => this.click())

        this.lifeCalendar = lifeCalendar;
        this.lifeCalendar.element.appendChild(this.element);
    }

    click() {
        this.lifeCalendar.fillInfoUI(this)
    }
}