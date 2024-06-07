import { LifeDay } from "/src/js/components/LifeDay.js";
import { LifePixel } from "/src/js/components/LifePixel.js";

export class LifeCalendar {
    constructor() {
        this.element = document.getElementById('lifeCalendar');
        this.infoElement = document.getElementById('lifeCalendarInformation');
        this.infoDateElement = document.getElementById('lifeCalendarInformation-date');
        this.infoPixelElement = document.getElementById('lifeCalendarInformation-pixel');
        this.year = new Date().getFullYear();
        this.lifeDay = undefined;

        document.getElementById('lifeCalendarInformation-hide').addEventListener('click', () => this.hideInfoUI());

        this.instantiate();
    }

    instantiate() {
        this.loopThroughYear((month, day) => {
            const lifeDay = new LifeDay(this, month, day);
        });

        this.createInfoUI();
        this.hideInfoUI();
    }

    loopThroughYear(callback) {
        const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const isLeapYear = this.isLeapYear();

        if (isLeapYear) {
            days[1] = 29;
        }

        for (let i = 1; i <= days.length; i++) {
            let numberOfDays = days[i - 1];

            for (let j = 1; j <= numberOfDays; j++) {
                callback(i, j)
            }
        }
    }

    isLeapYear() {
        return ((this.year % 4 == 0) && (this.year % 100 != 0)) || (this.year % 400 == 0);
    }
    
    createInfoUI() {
        new LifePixel({lifeCalendar: this, name: "good", pixelColor: "green"});
        new LifePixel({lifeCalendar: this, name: "neutral", pixelColor: "orange"});
        new LifePixel({lifeCalendar: this, name: "bad", pixelColor: "red"});
    }

    showInfoUI() {
        this.infoElement.style.display = "block";
    }

    hideInfoUI() {
        this.infoElement.style.display = "none";
    }

    fillInfoUI(lifeDay) {
        this.lifeDay = lifeDay;
        this.infoDateElement.innerText = new Date(this.year, lifeDay.month, lifeDay.day).toLocaleDateString();
        this.showInfoUI();
    }
}