import { NavButton } from "/src/js/components/NavButton.js";

export class Page {
    static currentPage = undefined;
    static tabIcon = document.getElementById('tab-icon');

    constructor(params) {
        this.name = params.name;
        this.element = document.getElementById('page-' + this.name);
        this.style = this.element.style;
        this.style.display = 'none';
        this.iconURL = "src/icons/" + params.iconFileName;
        this.navButton = new NavButton(this);

        this.navButton.onClick();
    }

    show() {
        if (Page.currentPage !== undefined) {
            Page.currentPage.style.display = 'none';
        }

        Page.currentPage = this;
        Page.currentPage.style.display = 'block';

        Page.tabIcon.href = this.iconURL;
    }
}