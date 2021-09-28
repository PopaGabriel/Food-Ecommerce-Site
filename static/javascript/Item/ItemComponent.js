const add_item_url = '/Restaurants/Menu/Food/get_basic_item'

class ItemComponent {
    constructor(options) {
        this.options = options;
        this.elements = {
            main: document.createElement("div"),
            head: this.createHead(""),
            body: this.createBody(),
            command: document.createElement("div")
        };
        ["skill-card"].forEach(elem => this.elements.main.classList.add(elem));
        [this.elements.head, this.elements.body].forEach(elem => this.elements.main.appendChild(elem));
        document.body.appendChild(this.elements.main);
    }

    createBody() {
        const body = document.createElement("div");
        ["skill-card__body"].forEach(elem => body.classList.add(elem));
        [this.createTitle(), this.createDescription(), this.createIngredients(), this.createPrice()].forEach(elem => body.appendChild(elem));

        return body;
    }

    createTitle() {
        const title_div = document.createElement("div");
        ["content_centered"].forEach(elem => title_div.classList.add(elem));

        const title = document.createElement("h2");
        ["skill-card__title"].forEach(elem => title.classList.add(elem));
        title.textContent = this.options.name;

        title_div.appendChild(title);

        return title_div;
    }

    createDescription() {
        const description = document.createElement("p");
        ["skill-card__duration", "content_centered"].forEach(elem => description.classList.add(elem));
        description.textContent = "\"" + this.options.description + "\"";

        return description
    }

    createIngredients() {
        const ingredients_div = document.createElement("div");
        ["row"].forEach(elem => ingredients_div.classList.add(elem));

        const title = document.createElement("p");
        ["ml-3"].forEach(cls => title.classList.add(cls));
        title.textContent = "Ingredients: ";
        ingredients_div.appendChild(title);

        this.options.ingredients.forEach(elem => {
            const aux = document.createElement("p");
            aux.textContent = elem;
            ["ml-3"].forEach(cls => aux.classList.add(cls));
            ingredients_div.appendChild(aux);
        })

        return ingredients_div;
    }

    createPrice() {
        const priceDiv = document.createElement("div");
        ["skill-card__body", "row", "ml-1"].forEach(elem => priceDiv.classList.add(elem));
        priceDiv.textContent = "Price: ";

        const price = document.createElement("p");
        ["ml-1"].forEach(cls => price.classList.add(cls));
        price.textContent = this.options.realPrice;

        //TODO
        // Make it look good
        if (this.options.discount > 0) {
            const discount = document.createElement("p");
            discount.textContent = "-" + this.options.discount + "%";
            discount.style.color = "red";
            price.style.textDecoration = "line-through";
            [price, discount].forEach(elem => priceDiv.appendChild(elem));
        } else
            [price].forEach(elem => priceDiv.appendChild(elem));

        return priceDiv;
    }

    createHead(image) {
        const header = document.createElement("div");
        ["skill-card__header"].forEach(elem => header.classList.add(elem));

        const imageAux = document.createElement("img");
        ["skill-card__icon"].forEach(elem => imageAux.classList.add(elem));

        if (image === "")
            fetch(add_item_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application.json"
                },
            }).then(response => response.json()).then(data => imageAux.src = data);
        else
            imageAux.src = image;

        [imageAux].forEach(elem => header.appendChild(elem));

        if (this.options.discount > 0) {
            const discount = document.createElement("span");
            ["product-label-discount"].forEach(elem => discount.classList.add(elem));
            discount.textContent = "-" + this.options.discount + "%";
            [discount].forEach(elem => header.appendChild(elem));
        }

        if (this.options.is_for_adults === 1) {
            const adult = document.createElement("span");
            ["product-label-age"].forEach(elem => adult.classList.add(elem));
            adult.textContent = "+18";
            [adult].forEach(elem => header.appendChild(adult))
        }

        return header
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
    description: "Description is a hard job"
})