class AddItemComponent {
    constructor(options) {
        this.elements = {
            main: document.createElement("div"),
            base: this.createBase(),
            ingredients: options.ingredients,
            command: document.createElement("div")
        }
        this.elements.main.classList.add("form_create_review");
        let confirm_window = document.createElement("div");
        confirm_window.classList.add("confirm__window");

        let title_bar = document.createElement("div")
        title_bar.classList.add("confirm__titlebar")
        confirm_window.appendChild(title_bar)

        let span = document.createElement("span")
        span.classList.add("confirm__title")
        span.innerText= "Add Item"
        title_bar.appendChild(span)

        let confirm_content = document.createElement("div")
        confirm_content.classList.add("confirm__content")
        confirm_content.appendChild(this.elements.base);
        confirm_content.appendChild(this.elements.ingredients.elements.main)
        confirm_window.appendChild(confirm_content)

        this.elements.main.appendChild(confirm_window)

        document.body.appendChild(this.elements.main);
    }

    createBase() {
        let base = document.createElement("div");

        let name = this.createInput("name", "text", "Add name", "Title");
        let price = this.createInput("price", "number", "0", "Price");
        let discount = this.createInput("dicount", "number", "0", "Discount");
        let adult = this.createInput("adult", "checkbox", "I it for adults", "Is for adults");

        [name, price, discount, adult].forEach(elem => base.appendChild(elem));
        return base;
    }

    createInput(name, type, placeholder, label) {
        let base = document.createElement("div");
        base.classList.add("m-1")

        let child = document.createElement("input");
        child.name = name;
        child.type = type;
        child.placeholder = placeholder;
        child.spellcheck = false;
        child.classList.add("input_test");

        let childTitle = document.createElement("p");
        childTitle.innerText = label;
        childTitle.appendChild(child);
        childTitle.classList.add("p_test");

        base.appendChild(childTitle);
        // base.appendChild(child);
        return base;
    }
}

export default AddItemComponent