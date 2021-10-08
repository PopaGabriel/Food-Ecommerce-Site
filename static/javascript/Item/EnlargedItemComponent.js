import Component from "../BasicComponents/Component.js";

const add_item_url = "/Restaurants/Menu/Food/get_basic_item";
const add_rating = "/ratings/add_review/item=<int:id>&&mark=<int:mark>";

class EnlargedItemComponent {
  constructor(options) {
    this.options = options;
    this.elements = {
      main: new Component("div"),
      head: this.createHead(),
      info: this.createInfo(),
      command: this.createCommand(),
      commandOwner: this.createCommadOwner(),
    };
    this.elements.main
      .addClasses(["row", "bigSkillCard"])
      .addChildren([this.elements.head, this.elements.info]);
  }

  createInfo() {
    const info = new Component("div")
      .addClasses(["coll", "ml-3"])
      .addChildren([
        this.createIngredients(),
        this.createPrice(),
        this.createCommand(),
        this.createCommadOwner(),
      ]);
    return info.html;
  }
  createCommadOwner() {
    const commandDiv = new Component("div").addClasses(["row"]);

    const deleteButton = new Component("button")
      .addClasses(["btn-test", "draw-border"])
      .addTextContent("Delete")
      .addListeners([() => {}]).html;

    const updateButton = new Component("button")
      .addClasses(["btn-test", "draw-border"])
      .addTextContent("Update")
      .addListeners([() => {}]).html;
    commandDiv.addChildren([updateButton, deleteButton]);
    return commandDiv.html;
  }
  createCommand() {
    const commandDiv = new Component("div").addClasses(["row", "special"]);
    const formOrder = new Component("div");
    const label = new Component("p");

    if (this.options.is_available) {
      const input_nr = new Component("input")
        .addClasses(["input_add_item"])
        .addMin(0)
        .addPlaceholder("0")
        .addType("number").html;
      label.addTextContent("How many do you want?").addChildren([input_nr]);
    } else {
      label.addTextContent("Not available").addClasses(["content_centered"]);
    }
    formOrder.addChildren([label.html]);
    commandDiv.addChildren([formOrder.html]);

    return commandDiv.html;
  }

  createHead() {
    const divHead = document.createElement("div");
    ["coll"].forEach((cls) => divHead.classList.add(cls));

    const header = document.createElement("div");
    header.classList.add("skill-card__header-enlarged");

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
    imageAux.classList.add("skill-card__icon-enlarged");

    imageAux.addEventListener("click", () => {
      this.downgrade();
    });
    header.append(imageAux);

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

    [header, this.createTitle()].forEach((elem) => divHead.appendChild(elem));
    return divHead;
  }

  createTitle() {
    const title_div = new Component("div").addClasses(["content_centered"]);

    const title = new Component("h2")
      .addClasses(["skill-card__title"])
      .addTextContent(this.options.name);

    title_div.addChildren([
      title.html,
      this.createStarSystem(),
      this.createDescription(),
    ]);
    return title_div.html;
  }

  createPrice() {
    const priceDiv = document.createElement("div");
    ["row"].forEach((cls) => priceDiv.classList.add(cls));

    const actualPrice = document.createElement("p");
    actualPrice.textContent = "Normal Price: " + this.options.price;

    if (this.options.discount > 0) {
      const realPrice = document.createElement("p");
      ["ml-3"].forEach((cls) => realPrice.classList.add(cls));
      realPrice.textContent =
        "Actual Price: " +
        this.options.price * (1 - this.options.discount / 100);
      [(actualPrice, realPrice)].forEach((elem) => priceDiv.appendChild(elem));
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
    const body = new Component("div").addClasses(["row", "content_centered"]);

    const generalRating = new Component("p").addTextContent(
      "(" + this.options.rating + ")"
    );

    const list_stars = [];
    for (let i = 0; i < 5; i++) list_stars.push(new Component("span"));

    for (let i = 0; i < list_stars.length; i++) {
      const elem = list_stars[i];
      if (i < this.options.rating_user)
        elem.addClasses(["star_selected", "material-icons"]);
      else elem.addClasses(["star", "material-icons"]);
      elem
        .addTextContent("star_rate")
        .addEventListener([
          "mouseenter",
          () => {
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([["star_select", true]]);
          },
        ])
        .addEventListener([
          "mouseout",
          () => {
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([["star_select", false]]);
          },
        ])
        .addEventListener([
          "click",
          () => {
            //Unchoose
            if (
              (elem.containsClass("star_selected") &&
                list_stars[list_stars.indexOf(elem) + 1] &&
                !list_stars[list_stars.indexOf(elem) + 1].containsClass(
                  "star_selected"
                )) ||
              (elem.containsClass("star_selected") &&
                list_stars.indexOf(elem) == list_stars.length - 1)
            ) {
              for (let j = 0; j < list_stars.length; j++)
                list_stars[j].toggle([
                  ["star_selected", false],
                  ["star", true],
                ]);
              this.options.rating_user = 0;

              fetch(
                add_rating
                  .replace("<int:id>", "" + this.options.id)
                  .replace("<int:mark>", "" + 0),
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application.json",
                    "X-CSRFToken": csrftoken,
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  generalRating.addTextContent("(" + data + ")");
                  this.options.rating = data;
                });
              return;
            }
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([
                ["star_select", false],
                ["star_selected", true],
              ]);

            for (
              let j = list_stars.indexOf(elem) + 1;
              j < list_stars.length;
              j++
            )
              list_stars[j].toggle([
                ["star_selected", false],
                ["star", true],
              ]);

            this.options.rating_user = list_stars.indexOf(elem) + 1;
            fetch(
              add_rating
                .replace("<int:id>", "" + this.options.id)
                .replace("<int:mark>", "" + (list_stars.indexOf(elem) + 1)),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application.json",
                  "X-CSRFToken": csrftoken,
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                generalRating.addTextContent("(" + data + ")");
                this.options.rating = data;
              });
          },
        ]);
      body.addChildren([elem.html]);
    }
    body.addChildren([generalRating.html]);
    return body.html;
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
    this.html.parentElement.insertBefore(
      new ItemComponent(this.options).html,
      this.html
    );
    this.html.parentElement.removeChild(this.html);
    return;
  }

  get html() {
    return this.elements.main.html;
  }
}

class ItemComponent {
  constructor(options) {
    this.options = options;
    this.elements = {
      main: document.createElement("div"),
      head: this.createHead(),
      body: this.createBody(),
    };
    ["skill-card"].forEach((elem) => this.elements.main.classList.add(elem));
    [this.elements.head, this.elements.body].forEach((elem) =>
      this.elements.main.appendChild(elem)
    );

    this.addEventListeners();
  }

  createBody() {
    const body = document.createElement("div");
    ["skill-card__body"].forEach((elem) => body.classList.add(elem));
    body.appendChild(this.createTitle());

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
      real_price.textContent =
        this.options.price * (1 - this.options.discount / 100) + " lei";
      [real_price].forEach((elem) => title_div.appendChild(elem));

      price.style.textDecoration = "line-through";
      ["light-text"].forEach((cls) => price.classList.add(cls));
    }

    return title_div;
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
    const body = new Component("div").addClasses(["row", "content_centered"]);

    const generalRating = new Component("p").addTextContent(
      "(" + this.options.rating + ")"
    );

    const list_stars = [];
    for (let i = 0; i < 5; i++) list_stars.push(new Component("span"));

    for (let i = 0; i < list_stars.length; i++) {
      const elem = list_stars[i];
      if (i < this.options.rating_user)
        elem.addClasses(["star_selected", "material-icons"]);
      else elem.addClasses(["star", "material-icons"]);
      elem
        .addTextContent("star_rate")
        .addEventListener([
          "mouseenter",
          () => {
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([["star_select", true]]);
          },
        ])
        .addEventListener([
          "mouseout",
          () => {
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([["star_select", false]]);
          },
        ])
        .addEventListener([
          "click",
          () => {
            //Unchoose
            if (
              (elem.containsClass("star_selected") &&
                list_stars[list_stars.indexOf(elem) + 1] &&
                !list_stars[list_stars.indexOf(elem) + 1].containsClass(
                  "star_selected"
                )) ||
              (elem.containsClass("star_selected") &&
                list_stars.indexOf(elem) == list_stars.length - 1)
            ) {
              for (let j = 0; j < list_stars.length; j++)
                list_stars[j].toggle([
                  ["star_selected", false],
                  ["star", true],
                ]);
              this.options.rating_user = 0;

              fetch(
                add_rating
                  .replace("<int:id>", "" + this.options.id)
                  .replace("<int:mark>", "" + 0),
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application.json",
                    "X-CSRFToken": csrftoken,
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  generalRating.addTextContent("(" + data + ")");
                  this.options.rating = data;
                });
              return;
            }
            for (let j = list_stars.indexOf(elem); j >= 0; j--)
              list_stars[j].toggle([
                ["star_select", false],
                ["star_selected", true],
              ]);

            for (
              let j = list_stars.indexOf(elem) + 1;
              j < list_stars.length;
              j++
            )
              list_stars[j].toggle([
                ["star_selected", false],
                ["star", true],
              ]);

            this.options.rating_user = list_stars.indexOf(elem) + 1;
            fetch(
              add_rating
                .replace("<int:id>", "" + this.options.id)
                .replace("<int:mark>", "" + (list_stars.indexOf(elem) + 1)),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application.json",
                  "X-CSRFToken": csrftoken,
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                generalRating.addTextContent("(" + data + ")");
                this.options.rating = data;
              });
          },
        ]);
      body.addChildren([elem.html]);
    }
    body.addChildren([generalRating.html]);
    return body.html;
  }
  addEventListeners() {
    this.elements.head.firstChild.addEventListener("click", () => {
      this.upgrade();
    });
  }
  upgrade() {
    this.elements.main.parentElement.insertBefore(
      new EnlargedItemComponent(this.options).html,
      this.elements.main
    );
    this.elements.main.parentElement.removeChild(this.elements.main);
    return;
  }
  get html() {
    return this.elements.main;
  }
}

export { EnlargedItemComponent, ItemComponent };
