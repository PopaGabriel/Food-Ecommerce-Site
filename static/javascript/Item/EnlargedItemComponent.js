class EnlargedItemComponent {
  constructor(options) {
    this.options = options;
    this.elements = {
      main: document.createElement("div"),
      head: this.createHead(),
      info: this.createInfo(),
      command: this.createCommand(),
    };
    ["row", "bigSkillCard"].forEach((cls) =>
      this.elements.main.classList.add(cls)
    );
    [this.elements.head, this.elements.info].forEach((elem) =>
      this.elements.main.appendChild(elem)
    );
    document.body.appendChild(this.html);
    document.body.appendChild(this.createStarSystem());
  }

  createInfo() {
    const info = document.createElement("div");
    ["coll", "ml-3"].forEach((elem) => info.classList.add(elem));

    [
      this.createIngredients(),
      this.createPrice(),
      this.createCommand(),
    ].forEach((elem) => info.appendChild(elem));
    return info;
  }

  createCommand() {
    const commandDiv = document.createElement("div");
    ["row", "special"].forEach((cls) => commandDiv.classList.add(cls));

    const formOrder = document.createElement("div");
    if (this.options.is_available) {
      const label = document.createElement("p");
      label.textContent = "How many do you want?";

      const input_nr = document.createElement("input");
      input_nr.type = "number";
      input_nr.placeholder = "0";
      input_nr.min = 0;
      ["input_add_item"].forEach((cls) => input_nr.classList.add(cls));

      [input_nr].forEach((elem) => label.appendChild(elem));
      [label].forEach((elem) => formOrder.appendChild(elem));
    } else {
      const label = document.createElement("p");
      label.textContent = "Not available";
      ["content_centered"].forEach((cls) => label.classList.add(cls));
      ["content_centered"].forEach((cls) => commandDiv.classList.add(cls));

      [label].forEach((elem) => formOrder.appendChild(elem));
    }

    [formOrder].forEach((elem) => commandDiv.appendChild(elem));

    return commandDiv;
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

    [title, this.createDescription()].forEach((elem) =>
      title_div.appendChild(elem)
    );
    return title_div;
  }

  createPrice() {
    const priceDiv = document.createElement("div");
    ["row"].forEach((cls) => priceDiv.classList.add(cls));

    const actualPrice = document.createElement("p");
    actualPrice.textContent = "Normal Price: " + this.options.price;

    if (this.options.discount > 0) {
      const realPrice = document.createElement("p");
      ["ml-3"].forEach((cls) => realPrice.classList.add(cls));
      realPrice.textContent = "Actual Price: " + this.options.realPrice;

      [actualPrice, realPrice].forEach((elem) => priceDiv.appendChild(elem));
    } else [actualPrice].forEach((elem) => priceDiv.appendChild(elem));
    return priceDiv;
  }

  createIngredients() {
    const ingredients_div = document.createElement("div");
    ["row"].forEach((elem) => ingredients_div.classList.add(elem));

    const title = document.createElement("p");
    title.textContent = "Ingredients: ";

    const aux = document.createElement("p");
    for (let i = 0; i < this.options.ingredients.length; i++)
      aux.textContent +=
        i !== this.options.ingredients.length - 1
          ? this.options.ingredients[i] + ", "
          : this.options.ingredients[i];
    ["ml-3"].forEach((cls) => aux.classList.add(cls));

    [title, aux].forEach((elem) => ingredients_div.appendChild(elem));

    return ingredients_div;
  }

  createStarSystem() {
    const body = document.createElement("div");
    ["row"].forEach((elem) => body.classList.add(elem));

    const list_stars = [
      document.createElement("span"),
      document.createElement("span"),
      document.createElement("span"),
      document.createElement("span"),
      document.createElement("span"),
    ];
    for (let i = 0; i < list_stars.length; i++) {
      const elem = list_stars[i];
      elem.classList.add("star", "material-icons");
      elem.textContent = "star_rate";

      elem.addEventListener("mouseenter", () => {
        for (let i = list_stars.indexOf(elem); i >= 0; i--) {
          list_stars[i].classList.toggle("star_select", true);
        }
      });
      elem.addEventListener("mouseout", () => {
        for (let i = list_stars.indexOf(elem); i >= 0; i--) {
          list_stars[i].classList.toggle("star_select", false);
        }
      });
      elem.addEventListener("click", () => {
        for (let i = list_stars.indexOf(elem); i >= 0; i--) {
          list_stars[i].classList.toggle("star_selected", true);
        }

        for (let i = list_stars.indexOf(elem); i >= 0; i--) {
          list_stars[i].classList.toggle("star_select", false);
        }
        for (let i = list_stars.indexOf(elem) + 1; i < list_stars.length; i++) {
          list_stars[i].classList.toggle("star_selected", false);
        }
      });
      body.appendChild(elem);
    }
    return body;
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
  is_available: false,
  ingredients: ["Banana", "Apple", "Orange"],
  discount: 11,
  realPrice: 90,
  is_for_adults: 1,
  description: "Description is a hard job",
  image: "/media/images/Salam.jpg",
});
