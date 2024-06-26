export class LifePixel {
    static pixels = {};

    constructor(params) {
        this.name = params.name;
        this.lifeCalendar = params.lifeCalendar;
        this.color = params.pixelColor;

        const container = document.createElement('div');
        container.addEventListener('click', () => this.click())
        container.classList.add('lifePixel');

        const iconElement = document.createElement('img');
        iconElement.src = '/src/icons/pixel-' + this.name + '.png';
        container.appendChild(iconElement);

        const dateElement = document.createElement('div');
        dateElement.classList.add('lifePixel-date');
        dateElement.innerText = this.name;
        container.appendChild(dateElement);

        this.lifeCalendar.infoPixelElement.appendChild(container);
        LifePixel.pixels[this.name] = this;
    }

    click() {
        const lifeDay = this.lifeCalendar.lifeDay;
        lifeDay.changeState(this);
    }
}