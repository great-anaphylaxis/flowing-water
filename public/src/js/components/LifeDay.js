import { LifePixel } from "/src/js/components/LifePixel.js";

export class LifeDay {
    constructor(params) {
        this.lifeCalendar = params.lifeCalendar;
        this.year = params.year;
        this.month = params.month;
        this.day = params.day;
        this.state = params.state;
        this.today = params.today;

        this.element = document.createElement('div');
        this.element.classList.add('lifeDay');
        this.element.innerText = this.day;
        this.element.addEventListener('click', () => this.click())

        this.lifeCalendar.element.appendChild(this.element);

        this.loadState();
        this.highlightIfToday();
    }

    highlightIfToday() {
        if (this.today) {
            this.element.classList.add('lifeDay-today');
        }
    }

    loadState() {
        const pixel = LifePixel.pixels[this.state];

        if (pixel) {
            this.element.style.backgroundColor = pixel.color;
        }
    }

    changeState(lifePixel) {
        this.element.style.backgroundColor = lifePixel.color;
        this.state = lifePixel.name;

        this.saveToCalendar();
    }

    saveToCalendar() {
        const key = this.lifeCalendar.dateToDataKey(this.month, this.day);
        this.lifeCalendar.calendar[this.year][key] = this.state;
        this.lifeCalendar.saveCalendar();
    }

    click() {
        this.lifeCalendar.fillInfoUI(this)
    }
}