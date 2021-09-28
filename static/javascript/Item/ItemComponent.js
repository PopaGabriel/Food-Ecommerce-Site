const add_item_url = "/Restaurants/Menu/Food/get_basic_item";

class ItemComponent {
    constructor(options) {
        this.options = options;
        this.elements = {
            main: document.createElement("div"),
            head: this.createHead(""),
            body: this.createBody(),
            command: this.createCommand(),
        };
        ["skill-card"].forEach((elem) => this.elements.main.classList.add(elem));
        [this.elements.head, this.elements.body].forEach((elem) => this.elements.main.appendChild(elem));

        document.body.appendChild(this.elements.main);

        this.addEventListeners()
    }

    createBody() {
        const body = document.createElement("div");
        ["skill-card__body"].forEach((elem) => body.classList.add(elem));
        [
            this.createTitle(),
            this.createCommand(),
            // this.createDescription(),
            // this.createIngredients(),
            // this.createPrice(),
        ].forEach((elem) => body.appendChild(elem));

        return body;
    }

    createTitle() {
        const title_div = document.createElement("div");
        ["content_centered"].forEach((elem) => title_div.classList.add(elem));

        const title = document.createElement("h2");
        ["skill-card__title"].forEach((elem) => title.classList.add(elem));
        title.textContent = this.options.name;

        const price = document.createElement("p");
        ["info_card"].forEach((elem) => price.classList.add(elem));
        price.textContent = this.options.price + " lei";
        [title, price].forEach((elem) => title_div.appendChild(elem));

        if (this.options.discount > 0) {
            const real_price = document.createElement("p");
            ["info_card_sale"].forEach((elem) => real_price.classList.add(elem));
            real_price.textContent = this.options.realPrice + " lei";
            [real_price].forEach((elem) => title_div.appendChild(elem));

            price.style.textDecoration = "line-through";
            ["light-text"].forEach((cls) => price.classList.add(cls));
        }

        return title_div;
    }

    createCommand() {
        const body = document.createElement("div");
        ["row", "content_centered"].forEach((elem) => body.classList.add(elem));

        const deleteButton = document.createElement("button");
        ["btn-test", "draw-border"].forEach((elem) => deleteButton.classList.add(elem));
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", ()=> {
           console.log("yes");
        });

        [deleteButton].forEach((elem) => body.appendChild(elem));

        return body;
    }

    createHead(image) {
        const header = document.createElement("div");
        ["skill-card__header"].forEach((elem) => header.classList.add(elem));

        const imageAux = document.createElement("img");
        ["skill-card__icon"].forEach((elem) => imageAux.classList.add(elem));

        if (image === "")
            fetch(add_item_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application.json",
                },
            })
                .then((response) => response.json())
                .then((data) => (imageAux.src = data));
        else imageAux.src = image;

        [imageAux].forEach((elem) => header.appendChild(elem));

        if (this.options.discount > 0) {
            const discount = document.createElement("span");
            ["product-label-discount"].forEach((elem) =>
                discount.classList.add(elem)
            );
            discount.textContent = "-" + this.options.discount + "%";
            [discount].forEach((elem) => header.appendChild(elem));
        }

        if (this.options.is_for_adults === 1) {
            const adult = document.createElement("span");
            ["product-label-age"].forEach((elem) => adult.classList.add(elem));
            adult.textContent = "+18";
            [adult].forEach((elem) => header.appendChild(adult));
        }

        return header;
    }

    addEventListeners() {
        this.elements.head.firstChild.addEventListener("click", () => {
            console.log(this.options);
        });
    }

    get html() {
        return this.elements.main;
    }
}

new ItemComponent({
    name: "Pizza",
    price: 100,
    ingredients: ["Banana", "Apple", "Orange"],
    discount: 11,
    realPrice: 90,
    is_for_adults: 1,
    description: "Description is a hard job",
});
