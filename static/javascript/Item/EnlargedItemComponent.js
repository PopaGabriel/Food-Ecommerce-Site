const add_item_url = "/Restaurants/Menu/Food/get_basic_item";

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

    const imageAux = document.createElement("img");
    if (this.options.image === "")
      fetch(add_item_url, {
        method: "GET",
        headers: {
          "Content-Type": "application.json",
        },
      })
        .then((response) => response.json())
        .then((data) => (imageAux.src = data));
    else imageAux.src = this.options.image;

    imageAux.addEventListener("click", () => {
      this.downgrade();
    });

    [imageAux, this.createTitle()].forEach((elem) => divHead.appendChild(elem));
    console.log(divHead);
    return divHead;
  }

  createTitle() {
    const title_div = document.createElement("div");
    ["content_centered"].forEach((elem) => title_div.classList.add(elem));

    const title = document.createElement("h2");
    ["skill-card__title"].forEach((elem) => title.classList.add(elem));
    title.textContent = this.options.name;

    [title, this.createStarSystem(), this.createDescription()].forEach((elem) =>
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
    ["row", "content_centered"].forEach((elem) => body.classList.add(elem));

    const generalRating = document.createElement("p");
    generalRating.textContent = "(" + this.options.rating + ")";

    const list_stars = [];
    for (let i = 0; i < 5; i++) list_stars.push(document.createElement("span"));

    for (let i = 0; i < list_stars.length; i++) {
      const elem = list_stars[i];
      if (i < this.options.rating_user)
        elem.classList.add("star_selected", "material-icons");
      else elem.classList.add("star", "material-icons");
      elem.textContent = "star_rate";

      elem.addEventListener("mouseenter", () => {
        for (let j = list_stars.indexOf(elem); j >= 0; j--)
          list_stars[j].classList.toggle("star_select", true);
      });
      elem.addEventListener("mouseout", () => {
        for (let j = list_stars.indexOf(elem); j >= 0; j--)
          list_stars[j].classList.toggle("star_select", false);
      });
      elem.addEventListener("click", () => {
        if (
          (elem.classList.contains("star_selected") &&
            list_stars[list_stars.indexOf(elem) + 1] &&
            !list_stars[list_stars.indexOf(elem) + 1].classList.contains(
              "star_selected"
            )) ||
          (elem.classList.contains("star_selected") &&
            list_stars.indexOf(elem) == list_stars.length - 1)
        ) {
          for (let j = 0; j < list_stars.length; j++) {
            list_stars[j].classList.toggle("star_selected", false);
            list_stars[j].classList.toggle("star", true);
          }
          return;
        }
        for (let j = list_stars.indexOf(elem); j >= 0; j--) {
          list_stars[j].classList.toggle("star_select", false);
          list_stars[j].classList.toggle("star_selected", true);
        }

        for (let j = list_stars.indexOf(elem) + 1; j < list_stars.length; j++) {
          list_stars[j].classList.toggle("star_selected", false);
          list_stars[j].classList.toggle("star", true);
        }
      });
      body.appendChild(elem);
    }
    body.appendChild(generalRating);
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

  downgrade() {
    // const position = this.html.parentElement.children.indexOf(this.html);
    // console.log(position);
    return new ItemComponent(this.options);
  }

  get html() {
    return this.elements.main;
  }
}

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
    [this.elements.head, this.elements.body].forEach((elem) =>
      this.elements.main.appendChild(elem)
    );

    document.body.appendChild(this.elements.main);

    this.addEventListeners();
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
    [title, this.createStarSystem(), price].forEach((elem) =>
      title_div.appendChild(elem)
    );

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
    ["btn-test", "draw-border"].forEach((elem) =>
      deleteButton.classList.add(elem)
    );
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      console.log("yes");
    });

    [deleteButton].forEach((elem) => body.appendChild(elem));

    return body;
  }

  createHead() {
    const header = document.createElement("div");
    ["skill-card__header"].forEach((elem) => header.classList.add(elem));

    const imageAux = document.createElement("img");
    ["skill-card__icon"].forEach((elem) => imageAux.classList.add(elem));

    if (this.options.image === "")
      fetch(add_item_url, {
        method: "GET",
        headers: {
          "Content-Type": "application.json",
        },
      })
        .then((response) => response.json())
        .then((data) => (imageAux.src = data));
    else imageAux.src = this.options.image;

    header.appendChild(imageAux);

    if (this.options.discount > 0) {
      const discount = document.createElement("span");
      ["product-label-discount"].forEach((elem) =>
        discount.classList.add(elem)
      );
      discount.textContent = "-" + this.options.discount + "%";
      header.appendChild(discount);
    }

    if (this.options.is_for_adults === 1) {
      const adult = document.createElement("span");
      ["product-label-age"].forEach((elem) => adult.classList.add(elem));
      adult.textContent = "+18";
      header.appendChild(adult);
    }

    return header;
  }

  createStarSystem() {
    const body = document.createElement("div");
    ["row", "content_centered"].forEach((elem) => body.classList.add(elem));

    const generalRating = document.createElement("p");
    generalRating.textContent = "(" + this.options.rating + ")";

    const list_stars = [];
    for (let i = 0; i < 5; i++) list_stars.push(document.createElement("span"));

    for (let i = 0; i < list_stars.length; i++) {
      const elem = list_stars[i];
      if (i < this.options.rating_user)
        elem.classList.add("star_selected", "material-icons");
      else elem.classList.add("star", "material-icons");
      elem.textContent = "star_rate";

      elem.addEventListener("mouseenter", () => {
        for (let j = list_stars.indexOf(elem); j >= 0; j--)
          list_stars[j].classList.toggle("star_select", true);
      });
      elem.addEventListener("mouseout", () => {
        for (let j = list_stars.indexOf(elem); j >= 0; j--)
          list_stars[j].classList.toggle("star_select", false);
      });
      elem.addEventListener("click", () => {
        if (
          (elem.classList.contains("star_selected") &&
            list_stars[list_stars.indexOf(elem) + 1] &&
            !list_stars[list_stars.indexOf(elem) + 1].classList.contains(
              "star_selected"
            )) ||
          (elem.classList.contains("star_selected") &&
            list_stars.indexOf(elem) == list_stars.length - 1)
        ) {
          for (let j = 0; j < list_stars.length; j++) {
            list_stars[j].classList.toggle("star_selected", false);
            list_stars[j].classList.toggle("star", true);
          }
          return;
        }
        for (let j = list_stars.indexOf(elem); j >= 0; j--) {
          list_stars[j].classList.toggle("star_select", false);
          list_stars[j].classList.toggle("star_selected", true);
        }

        for (let j = list_stars.indexOf(elem) + 1; j < list_stars.length; j++) {
          list_stars[j].classList.toggle("star_selected", false);
          list_stars[j].classList.toggle("star", true);
        }
      });
      body.appendChild(elem);
    }
    body.appendChild(generalRating);
    return body;
  }
  addEventListeners() {
    this.elements.head.firstChild.addEventListener("click", () => {
      this.upgrade();
    });
  }
  upgrade() {
    new EnlargedItemComponent(this.options);
    return;
  }
  get html() {
    return this.elements.main;
  }
}

// new ItemComponent({
//   name: "Pizza",
//   price: 100,
//   ingredients: ["Banana", "Apple", "Orange"],
//   discount: 11,
//   realPrice: 90,
//   is_for_adults: 1,
//   description: "Description is a hard job",
//   image: "",
// });

// new EnlargedItemComponent({
//   name: "Pizza",
//   price: 100,
//   is_available: false,
//   ingredients: ["Banana", "Apple", "Orange"],
//   discount: 11,
//   realPrice: 90,
//   is_for_adults: 1,
//   rating_user: 4,
//   rating: 3.37,
//   description:
//     "Description is a hard job Description is a hard job Description is a hard job Description is a hard job",
//   image: "",
// });
