import { Page } from "/src/js/components/Page.js";

export class Nav {
    constructor() {
        this.element = document.getElementById('nav');
        this.style = this.element.style;
    }

    update() {
        this.clearUpNav();
        this.fillUpNav();
    }

    fillUpNav() {
        for (let i = 0; i < Page.pages.length; i++) {
            let page = Page.pages[i];

            this.createNavButton(page)
        }
    }

    clearUpNav() {
        this.element.innerHTML = '';
    }

    createNavButton(page) {
        let img = document.createElement('img');
        img.src = page.iconURL;

        img.addEventListener('click', () => {
            page.show();
        })

        this.element.appendChild(img)
    }
}