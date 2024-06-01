import { Page } from "/src/js/components/Page.js";
import { Nav } from "/src/js/components/Nav.js";
 
export class NavButton {
    constructor(page) {
        this.element = document.createElement('img');
        this.style = this.element.style;
        this.element.src = page.iconURL;

        this.element.addEventListener('click', () => {
            this.pastPage = Page.currentPage;
            
            page.show();
            this.highlightNavButton();
        })

        Nav.element.appendChild(this.element)
    }

    highlightNavButton() {
        let pastNavButton = this.pastPage.navButton.element;
        
        pastNavButton.classList.remove('navButton-highlight');
        this.element.classList.add('navButton-highlight');
    }
}