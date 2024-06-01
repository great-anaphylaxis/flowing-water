import { Page } from "/src/js/components/Page.js";
import { NavButton } from "/src/js/components/NavButton.js";

export class Nav {
    static element;

    constructor() {
        Nav.element = document.getElementById('nav');
    }
}