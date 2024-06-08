import { LifeDay } from "/src/js/components/LifeDay.js";
import { LifePixel } from "/src/js/components/LifePixel.js";
import { AppData } from "/src/js/components/AppData.js";

export class LifeCalendar {
    calendar = {};

    constructor() {
        this.element = document.getElementById('lifeCalendar');
        this.infoElement = document.getElementById('lifeCalendarInformation');
        this.infoDateElement = document.getElementById('lifeCalendarInformation-date');
        this.infoStateElement = document.getElementById('lifeCalendarInformation-state');
        this.infoPixelElement = document.getElementById('lifeCalendarInformation-pixel');
        this.rightNow = new Date();
        this.year = this.rightNow.getFullYear();
        this.month = this.rightNow.getMonth();
        this.day = this.rightNow.getDay();
        this.lifeDay = undefined;

        document.getElementById('lifeCalendarInformation-hide').addEventListener('click', () => this.hideInfoUI());

        this.loadCalendar();
    }

    saveCalendar() {
        AppData.data.calendar = this.calendar;
        AppData.saveData();
    }

    loadCalendar() {
        if (!AppData.data.calendar) {
            AppData.data['calendar'] = {};
            AppData.data.calendar[this.year] = {};
        }

        this.calendar = AppData.data.calendar || {};

        this.instantiate();
    }

    instantiate() {
        const year = this.year;
        
        this.createInfoUI();
        this.hideInfoUI();

        this.loopThroughCalendar(year, (month, day) => {
            const calendar = this.calendar[year] || {};
            const savedLifeDayKey = this.dateToDataKey(month, day);
            const savedLifeDayExists = calendar[savedLifeDayKey];
            const isToday = (year == this.year && month == this.month && day == this.day)
            let state = "default"

            if (savedLifeDayExists) {
                state = savedLifeDayExists;
            }

            const lifeDay = new LifeDay({
                lifeCalendar: this, year: this.year, month: month, day: day, state: state, today: isToday
            });

            if (isToday) {
                this.fillInfoUI(lifeDay)
            }
        });

    }

    dateToDataKey(month, day) {
        return `${month}/${day}`;
    }

    loopThroughCalendar(year, callback) {
        const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const isLeapYear = this.isLeapYear(year);

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

    isLeapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
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
        const state = lifeDay.state == "default" ? "None" : lifeDay.state;
        const dateString = new Date(this.year, lifeDay.month + 1, lifeDay.day).toLocaleDateString();
        const todayString = lifeDay.today ? " (today)" : "";

        this.lifeDay = lifeDay;
        this.infoDateElement.innerText = dateString + todayString;
        this.infoStateElement.innerText = `State: ${state}`;
        this.showInfoUI();
    }
}