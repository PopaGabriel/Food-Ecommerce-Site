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
      .addChildren([this.elements.head, this.elements.info])
      .addName(this.options.id);
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
  toggle(classes = []) {
    this.elements.main.toggle(classes);
    return this;
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
    const item = new ItemComponent(this.options);
    if (this.elements.main.containsClass("draggable_card")) {
      item.toggle([["draggable_card"], true]);
      item.toggleDraggable();
    }
    this.html.parentElement.insertBefore(item.html, this.html);
    this.html.parentElement.removeChild(this.html);

    this.options.parent.changeChild(this, item);
    return;
  }
  toggleDraggable() {
    this.elements.main.toggleDraggable();
    return this;
  }
  addEventListeners(functions = []) {
    for (let i = 0; i < functions.length; i++) {
      this.elements.main.addEventListener(functions[i]);
    }
    return this;
  }

  get html() {
    return this.elements.main.html;
  }
}

class ItemComponent {
  constructor(options) {
    this.options = options;
    this.elements = {
      main: new Component("div"),
      head: this.createHead(),
      body: this.createBody(),
    };
    this.elements.main
      .addClasses(["skill-card"])
      .addChildren([this.elements.head, this.elements.body])
      .addName(this.options.id);
  }

  createBody() {
    return new Component("div")
      .addClasses(["skill-card__body"])
      .addChildren([this.createTitle()]).html;
  }

  createTitle() {
    const title_div = new Component("div").addClasses(["content_centered"]);

    const title = new Component("h2")
      .addClasses(["skill-card__title"])
      .addTextContent(this.options.name);

    const price = new Component("p")
      .addClasses(["info_card"])
      .addTextContent(this.options.price + " lei");

    title_div.addChildren([title.html, this.createStarSystem(), price.html]);
    if (this.options.discount > 0) {
      const real_price = new Component("p")
        .addClasses(["info_card_sale"])
        .addTextContent(
          this.options.price * (1 - this.options.discount / 100) + " lei"
        );

      price.html.style.textDecoration = "line-through";
      price.addClasses(["light-text"]);
      title_div.addChildren([real_price.html]);
    }
    return title_div.html;
  }

  createHead() {
    const header = new Component("div").addClasses(["skill-card__header"]);
    const imageAux = new Component("img")
      .addClasses(["skill-card__icon"])
      .addListeners([() => this.upgrade()]);

    if (this.options.image === "")
      fetch(add_item_url, {
        method: "GET",
        headers: {
          "Content-Type": "application.json",
        },
      })
        .then((response) => response.json())
        .then((data) => imageAux.addSrc(data));
    else imageAux.addSrc(this.options.image);

    header.addChild(imageAux.html);

    if (this.options.discount > 0) {
      const discount = new Component("span")
        .addClasses(["product-label-discount"])
        .addTextContent("-" + this.options.discount + "%");
      header.addChild(discount.html);
    }

    if (this.options.is_for_adults === 1) {
      const adult = new Component("span")
        .addClasses(["product-label-age"])
        .addTextContent("+18");
      header.addChild(adult.html);
    }

    return header.html;
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
  addEventListeners(functions = []) {
    for (let i = 0; i < functions.length; i++) {
      this.elements.main.addEventListener(functions[i]);
    }
    return this;
  }
  toggle(classes = []) {
    this.elements.main.toggle(classes);
    return this;
  }

  upgrade() {
    const item = new EnlargedItemComponent(this.options);
    if (this.elements.main.containsClass("draggable_card")) {
      item.toggleDraggable();
      item.toggle([["draggable_card", true]]);
    }

    this.html.parentElement.insertBefore(item.html, this.html);
    this.html.parentElement.removeChild(this.html);

    this.options.parent.changeChild(this, item);
  }
  toggleDraggable() {
    this.elements.main.toggleDraggable();
    return this;
  }
  get html() {
    return this.elements.main.html;
  }
}

export { EnlargedItemComponent, ItemComponent };
