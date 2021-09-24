class AddItemComponent {
    constructor(parent, options) {
        this.elements = {
            main: document.createElement("div"),
            title: document.createElement("div"),
            ingredients: document.createElement("div")
        };
        [this.elements.title, this.elements.container].forEach(elem => this.elements.main.appendChild(elem));
        parent.appendChild(this.elements.main);
    }
}

export default AddItemComponent