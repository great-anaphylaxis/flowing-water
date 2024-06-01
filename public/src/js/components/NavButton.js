import { Page } from "/src/js/components/Page.js";
import { Nav } from "/src/js/components/Nav.js";
 
export class NavButton {
    constructor(page) {
        this.page = page;
        this.element = document.createElement('img');
        this.element.classList.add('navButton')
        this.style = this.element.style;
        this.element.src = this.page.iconURL;

        this.addClickListener();

        Nav.element.appendChild(this.element)
    }

    highlightNavButton() {
        let pastNavButton = this.pastPage.navButton.element;

        pastNavButton.classList.remove('navButton-highlight');
        this.element.classList.add('navButton-highlight');
    }

    addClickListener() {
        this.element.addEventListener('click', () => {
            this.onClick();
        })
    }

    onClick() {
        this.pastPage = Page.currentPage || this.page;
            
        this.page.show();
        this.highlightNavButton();
    }
}