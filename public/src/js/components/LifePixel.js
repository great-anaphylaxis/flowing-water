export class LifePixel {
    constructor(lifeCalendar, name) {
        this.name = name;

        const container = document.createElement('div');
        container.classList.add('lifePixel');

        const iconElement = document.createElement('img');
        iconElement.src = '/src/icons/pixel-' + this.name + '.png';
        container.appendChild(iconElement);

        const dateElement = document.createElement('div');
        dateElement.classList.add('lifePixel-date');
        dateElement.innerText = this.name;
        container.appendChild(dateElement);

        this.lifeCalendar = lifeCalendar;
        this.lifeCalendar.infoPixelElement.appendChild(container);

        console.log(1)
    }
}