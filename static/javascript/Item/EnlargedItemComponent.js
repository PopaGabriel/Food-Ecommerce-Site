class EnlargedItemComponent {
    constructor(options) {
        this.options = options;
        this.elements = {
            main: document.createElement("div"),
            head: this.createHead(),
            info: document.createElement("div")
        };
        ["row", "bigSkillCard"].forEach((cls) => this.elements.main.classList.add(cls));
        [this.elements.head].forEach((elem) => this.elements.main.appendChild(elem));
        document.body.appendChild(this.html)
    }

    createHead() {
        const divHead = document.createElement("div");
        ["coll"].forEach((cls) => divHead.classList.add(cls));

        const image = document.createElement("img");
        image.src = this.options.image;

        [image, this.createTitle()].forEach((elem) => divHead.appendChild(elem));
        return divHead;
    }

    createTitle() {
        const title_div = document.createElement("div");
        ["content_centered"].forEach((elem) => title_div.classList.add(elem));

        const title = document.createElement("h2");
        ["skill-card__title"].forEach((elem) => title.classList.add(elem));
        title.textContent = this.options.name;

        [title, this.createDescription()].forEach((elem) => title_div.appendChild(elem));
        return title_div;
    }

    createIngredients() {
        const ingredients_div = document.createElement("div");
        ["row"].forEach((elem) => ingredients_div.classList.add(elem));

        const title = document.createElement("p");
        ["ml-3"].forEach((cls) => title.classList.add(cls));
        title.textContent = "Ingredients: ";
        ingredients_div.appendChild(title);

        this.options.ingredients.forEach((elem) => {
            const aux = document.createElement("p");
            aux.textContent = elem;
            ["ml-3"].forEach((cls) => aux.classList.add(cls));
            ingredients_div.appendChild(aux);
        });

        return ingredients_div;
    }

    createDescription() {
        const description = document.createElement("p");
        ["skill-card__duration", "content_centered"].forEach((elem) =>
            description.classList.add(elem)
        );
        description.textContent = '"' + this.options.description + '"';
        return description;
    }

    get html() {
        return this.elements.main;
    }
}

new EnlargedItemComponent({
    name: "Pizza",
    price: 100,
    ingredients: ["Banana", "Apple", "Orange"],
    discount: 11,
    realPrice: 90,
    is_for_adults: 1,
    description: "Description is a hard job",
    image: "/media/images/Salam.jpg"
});
