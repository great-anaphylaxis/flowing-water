export class Page {
    static pages = [];
    static currentPage = undefined;

    constructor(params) {
        this.name = params.name;
        this.element = document.getElementById('page-' + this.name);
        this.style = this.element.style;
        this.iconURL = "src/icons/" + params.iconFileName;

        Page.pages.push(this)

        this.show();
    }

    show() {
        for (let i = 0; i < Page.pages.length; i++) {
            let page = Page.pages[i];

            if (page.name === this.name) {
                page.style.display = 'block';
                Page.currentPage = page;
            }

            else {
                page.style.display = 'none';
            }
        }
    }
}